import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Chart from "react-apexcharts";

import api from '../../services/api';

import '../css/admin/Dashboard.admin.css'
import '../css/admin/media-layout.css'

var thisMonth = [0,0,0,0,0,0,0]
var lastMonth = [0,0,0,0,0,0,0]

export const DashboardAdmin = () => {
    const date = new Date()
    const [openManifests, setOpenManifests] = useState()
    const [progressManifests, setProgressManifests] = useState()
    const [concludedManifests, setConcludedManifests] = useState()
    const [chartWidth, setChartWidth] = useState(500)
    const [manifestNumber, setManifestNumber] = useState(0)

    const [usersAges, setUsersAges] = useState({
        smaller19: 0,
        bigger60: 0,
        between20And39: 0,
        between40And49: 0,
    })

    const [firstChartInfo, setFirstChartInfo] = useState({
        requests: {
            amount: 0,
            percent: 0
        },
        claims: {
            amount: 0,
            percent: 0
        },
        complaints: {
            amount: 0,
            percent: 0
        },
        compliments: {
            amount: 0,
            percent: 0
        },
        information: {
            amount: 0,
            percent: 0
        },
        suggestions: {
            amount: 0,
            percent: 0
        },
    })

    const [thirdChartInfo, setThirdChartInfo] = useState({
        masculine: 0,
        feminine: 0,
        dontIdentify: 0,
    })
    
    const navigate = useNavigate();

    useEffect(() => {
        getNumberManifestationTypes()
        setChartsDimensions()
    }, [])
    
    const getNumberManifestationTypes = async () => {
        try {
            const { data } = await api.get('manifests', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('adm_bearer_token')
                }
            })
            calculateDateOfManifests(data)
            setManifestNumber(data.length)
            getTypeOfManifests(data)
            /* TODO: descomentar */
            /* getManifestsRequest(data) */
            await getTypeOfManifestsGenderNumber()
            await calculateUsersAges()
            
            setOpenManifests(data.filter((manifest: any) => manifest.manifestStatus.toLowerCase() == 'em aberto').length)
            setProgressManifests(data.filter((manifest: any) => manifest.manifestStatus.toLowerCase() == 'em andamento').length)
            setConcludedManifests(data.filter((manifest: any) => manifest.manifestStatus.toLowerCase() == 'concluído').length)
        } catch (err) {
            console.log(err)
        }
    }

    const calculateDateOfManifests = (data: any) => {
        data.forEach((value: any) => {
            let currentDate = new Date()
            let itsFromThisMonth = currentDate.getUTCMonth() + 1 == new Date(value.created_at).getUTCMonth() + 1
            
            let manifestCreatedDay = new Date(value.created_at).getUTCDate()
            if (manifestCreatedDay >= 1 && manifestCreatedDay <= 4) {
                itsFromThisMonth ? thisMonth[0]++ : lastMonth[0]++
            }
            if (manifestCreatedDay >= 5 && manifestCreatedDay <= 9) {
                itsFromThisMonth ? thisMonth[1]++ : lastMonth[1]++
            }
            if (manifestCreatedDay >= 10 && manifestCreatedDay <= 14) {
                itsFromThisMonth ? thisMonth[2]++ : lastMonth[2]++
            }
            if (manifestCreatedDay >= 15 && manifestCreatedDay <= 19) {
                itsFromThisMonth ? thisMonth[3]++ : lastMonth[3]++
            }
            if (manifestCreatedDay >= 20 && manifestCreatedDay <= 24) {
                itsFromThisMonth ? thisMonth[4]++ : lastMonth[4]++
            }
            if (manifestCreatedDay >= 25 && manifestCreatedDay <= 29) {
                itsFromThisMonth ? thisMonth[5]++ : lastMonth[5]++
            }
            return value
        })
    }

    const percentage = (partialValue: number, totalValue: number) => partialValue != 0 ? Math.round((partialValue / totalValue) * 100) : 0
    
    const getTypeOfManifests = (data: any) => {
        setFirstChartInfo({
            requests: {
                amount: getSizeOfManifestType(data, 'solicitacao'),
                percent: getSizeOfManifestType(data, 'solicitacao')
            },
            claims: {
                amount: getSizeOfManifestType(data, 'reclamacao'),
                percent: getSizeOfManifestType(data, 'reclamacao')
            },
            complaints: {
                amount: getSizeOfManifestType(data, 'denuncia'),
                percent: getSizeOfManifestType(data, 'denuncia')
            },
            compliments: {
                amount: getSizeOfManifestType(data, 'elogio'),
                percent: getSizeOfManifestType(data, 'elogio')
            },
            information: {
                amount: getSizeOfManifestType(data, 'informacao'),
                percent: getSizeOfManifestType(data, 'informacao')
            },                        
            suggestions: {
                amount: getSizeOfManifestType(data, 'sugestao'),
                percent: getSizeOfManifestType(data, 'sugestao')
            }
        })
    }

    /* const getManifestsRequest = (data: any) => {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        let previousMonth = currentMonth - 1;
        let previousYear = currentYear;
        if (previousMonth < 0) {
            previousMonth = 11;
            previousYear -= 1;
        }
        const previousMonthDate = new Date(previousYear, previousMonth, 1).getMonth();
        let currentMonthRequestsNumber = data.filter((manifest: any) => manifest.created_at.includes(currentMonth + 1)).length
        let previousMonthRequestsNumber = data.filter((manifest: any) => manifest.created_at.includes(previousMonthDate + 1)).length
    } */

    const getTypeOfManifestsGenderNumber = async () => {
        const { data } = await getUsers()
        setThirdChartInfo({
            masculine: data.filter((user: any) => user.gender?.toLowerCase() == 'masculino').length,
            feminine: data.filter((user: any) => user.gender?.toLowerCase() == 'feminino').length,
            dontIdentify: data.filter((user: any) => user.gender?.toLowerCase() == 'não me identifico').length
        })
    }

    const getUsers = async () => {
        try {
            return await api.get('users', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('adm_bearer_token')
                }
            })
        } catch (err) {
            throw err
        }
    }

    const calculateUsersAges = async () => {
        const { data } = await getUsers()
        let result = data.reduce((acc: any[], user: any) => {
            user.age = getAge(user.dateOfBirth)
            acc.push(user)
            return acc
        }, [])
        setUsersAges({
            smaller19: result.filter((user: any) => user.age <= 19).length,
            bigger60: result.filter((user: any) => user.age > 60).length,
            between20And39: result.filter((user: any) => user.age >= 20 && user.age <= 39).length,
            between40And49: result.filter((user: any) => user.age >= 40 && user.age <= 49).length
        })
    }

    function getAge(dateString: string | number | Date) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    const getSizeOfManifestType = (manifests: any, type: string) => {
        return manifests.filter((manifest: any) => manifest.manifestType.toLowerCase() == type).length
    }

    const setChartsDimensions = () => {
        setInterval(() => {
            // controlando o comprimento dos graficos
            if (window.innerWidth > 1337) {
                setChartWidth(500)
            }
            if (window.innerWidth > 1220 && window.innerWidth <= 1337) {
                setChartWidth(400)
            }
            if (window.innerWidth <= 1220 && window.innerWidth > 1116) {
                setChartWidth(800)
            }
            if (window.innerWidth <= 1117 && window.innerWidth >= 1002) {
                setChartWidth(700)
            }
            if (window.innerWidth <= 1002 && window.innerWidth >= 760) {
                setChartWidth(450)
            }
            if (window.innerWidth <= 760 && window.innerWidth >= 592) {
                setChartWidth(350)
            }
            if (window.innerWidth <= 592) {
                setChartWidth(300)
            }
        }, 100)
    }

    const a = {
        options: {
            chart: {
                id: "basic-bar",
                background: '#e5e5e575'
            },
            plotOptions: {
                bar: {
                    distributed: true,
                    dataLabels: {
                        total: {
                            style: {
                                fontSize: '1px'
                            }
                        }
                    }
                }
            },
            xaxis: {
                categories: [
                    'SOLICITAÇÃO',
                    'RECLAMAÇÃO',
                    'DENÚNCIA',
                    'ELOGIO',
                    'INFORMAÇÃO',
                    'SUGESTÃO'
                ]
            },
            markers: {
                size: [4, 7]
            },
        },
        series: [
            {
                name: "Quantidade",
                data: [
                    firstChartInfo.requests.amount,
                    firstChartInfo.claims.amount,
                    firstChartInfo.complaints.amount,
                    firstChartInfo.compliments.amount,
                    firstChartInfo.information.amount,
                    firstChartInfo.suggestions.amount,
                ]
            }
        ]
    }
    const b = {
        options: {
            chart: {
                id: "basic-bar",
                background: '#e5e5e575'

            },
            xaxis: {
                categories: [
                    `1/${date.getMonth() + 1}/${JSON.stringify(date.getFullYear()).slice(-2)}`,
                    `5/${date.getMonth() + 1}/${JSON.stringify(date.getFullYear()).slice(-2)}`,
                    `10/${date.getMonth() + 1}/${JSON.stringify(date.getFullYear()).slice(-2)}`,
                    `15/${date.getMonth() + 1}/${JSON.stringify(date.getFullYear()).slice(-2)}`,
                    `20/${date.getMonth() + 1}/${JSON.stringify(date.getFullYear()).slice(-2)}`,
                    `25/${date.getMonth() + 1}/${JSON.stringify(date.getFullYear()).slice(-2)}`,
                    `30/${date.getMonth() + 1}/${JSON.stringify(date.getFullYear()).slice(-2)}`,
                    ]
            },
            markers: {
                size: [7, 7]
            },
            colors: ["#FFA500", "#C00405"],
        },
        series: [
            {
                name: "Este mês",
                data: thisMonth
            },
            {
                name: "Mês anterior",
                data: lastMonth
            }
        ]
    }
    const c = {
        series: [
            thirdChartInfo.feminine,
            thirdChartInfo.masculine,
            thirdChartInfo.dontIdentify
        ],
        options: {
            chart: {
                width: 380,
            },
            colors: ['#BF000E', '#C96D87', '#F7999E' ],

            labels: ['Feminino', 'Masculino', 'Não me identifico'],
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },

                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        },
    }
    const d = {
        series: [{
            data: [
                usersAges.smaller19,
                usersAges.bigger60,
                usersAges.between20And39,
                usersAges.between40And49
            ]
        }],
        options: {
            chart: {
                height: 350,
                events: {
                    click: function(chart: any, w: any, e: any) {
                        console.log(chart, w, e)
                    }
                }
            },
            colors: ['#C00405', '#ffb3b3', '#d15d5d', '#e76768'],
            plotOptions: {
                bar: {
                columnWidth: '45%',
                distributed: true,
                }
            },
            dataLabels: {
                enabled: false
            },
            legend: {
                show: false
            },
            xaxis: {
                categories: [
                    '0-19 anos',
                    'Acima de 60 anos',
                    '20-39 anos',
                    '40-49 anos',
                ],
                labels: {
                    style: {
                        colors: ['#C00405', '#ffb3b3', '#d15d5d', '#e76768'],
                        fontSize: '12px'
                    }
                }
            }
        },
    }

    return (
        <div className="dashboard-admin">
            <div className="manifest-status-info">
                <div className="info-container open-manifests">
                    <div className="info-context">
                        <div className="status-color open-manifests"></div>
                        <span className='info-number'>{openManifests}</span>
                        <span className='title'>Manifestações abertas</span>
                    </div>
                    <div className='see-manifests'>
                        <button className="see-manifests-btn" onClick={() => navigate('/administrador/manifests/open')}>
                            Ver manifestações
                        </button>
                    </div>
                </div>
                <div className="info-container progress-manifests">
                    <div className="info-context">
                        <div className="status-color progress-manifests"></div>
                        <span className='info-number'>{progressManifests}</span>
                        <span className='title'>Manifestações em andamento</span>
                    </div>
                    <div className='see-manifests'>
                        <button className="see-manifests-btn" onClick={() => navigate('/administrador/manifests/in-progress')}>
                            Ver manifestações
                        </button>
                    </div>
                </div>
                <div className="info-container concluded-manifests">
                    <div className="info-context">
                    <div className="status-color concluded-manifests"></div>
                        <span className='info-number'>{concludedManifests}</span>
                        <span className='title'>Manifestações concluídas</span>
                    </div>
                    <div className='see-manifests'>
                        <button className="see-manifests-btn" onClick={() => navigate('/administrador/manifests/complete')}>
                            Ver manifestações
                        </button>
                    </div>
                </div>
            </div>
            <div className='charts'>
                <Chart
                    className="chart-1"
                    options={a.options}
                    series={a.series}
                    type="bar"
                    width={chartWidth}
                    height="400"
                />
                <Chart
                    className="chart-2"
                    options={b.options}
                    series={b.series}
                    type="line"
                    width={chartWidth}
                    height="400"
                />
            </div>
            <div className="manifestation-funnel">
                <div className="title">Funil de manifestações</div>
                <div className="funil-context-container">
                    <div className="funil-content first">
                        <div className="type-title">Solicitação</div>
                        <div className="amount">{firstChartInfo.requests.amount}</div>
                        <div className="percent-value">{percentage(firstChartInfo.requests.percent, manifestNumber)}%</div>
                    </div>
                    <div className="funil-content">
                        <div className="type-title">Reclamação</div>
                        <div className="amount">{firstChartInfo.claims.amount}</div>
                        <div className="percent-value">{percentage(firstChartInfo.claims.percent, manifestNumber)}%</div>
                    </div>
                    <div className="funil-content">
                        <div className="type-title">Denúncia</div>
                        <div className="amount">{firstChartInfo.complaints.amount}</div>
                        <div className="percent-value">{percentage(firstChartInfo.complaints.percent, manifestNumber)}%</div>
                    </div>
                    <div className="funil-content">
                        <div className="type-title">Elogio</div>
                        <div className="amount">{firstChartInfo.compliments.amount}</div>
                        <div className="percent-value">{percentage(firstChartInfo.compliments.percent, manifestNumber)}%</div>
                    </div>
                    <div className="funil-content">
                        <div className="type-title">Informação</div>
                        <div className="amount">{firstChartInfo.information.amount}</div>
                        <div className="percent-value">{percentage(firstChartInfo.information.percent, manifestNumber)}%</div>
                    </div>
                    <div className="funil-content">
                        <div className="type-title">Sugestão</div>
                        <div className="amount">{firstChartInfo.suggestions.amount}</div>
                        <div className="percent-value">{percentage(firstChartInfo.suggestions.percent, manifestNumber)}%</div>
                    </div>
                    <div className="funil-content">
                        <div className="type-title">Total</div>
                        <div className="amount">{manifestNumber}</div>
                        <div className="percent-value">100%</div>
                    </div>
                </div>
            </div>
            <div className='charts'>
                <Chart
                    options={c.options}
                    series={c.series}
                    type="pie"
                    width={chartWidth}
                    height="400"
                />
                <Chart
                    options={d.options}
                    series={d.series}
                    type="bar"
                    width={chartWidth}
                    height="400"
                />
            </div>
        </div>
    )
}