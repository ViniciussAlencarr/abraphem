import { useState, useEffect } from 'react'

interface ParamsInterface {
    pcd: boolean,
    deficiencies: any[],
    existentData: string | undefined,
    setDeficiencies: (deficiencies: any[]) => any
}

interface MultipleUsers {
    pcd: boolean,
    patient: any,
    index: any,
    existentData: string | undefined
}

export const SelectDeficiencies = (params: ParamsInterface) => {
    const [open, setOpen] = useState(false)
    const [sizeOfDeficiencies, setSizeOfDeficiencies] = useState(0)

    const checkDeficiency = (event: any) => {
        let index = event.target.getAttribute('data-index')
        let updateDeficiencies = [...params.deficiencies]
        updateDeficiencies[index].checked = !updateDeficiencies[index].checked
        params.setDeficiencies(updateDeficiencies)
        setSizeOfDeficiencies(params.deficiencies.filter((deficiency) => deficiency.checked).length)
    }

    useEffect(() => {
        if (params.existentData) {
            params.existentData.split(',').map(existentDeficiency => {
                let deficiencyIndex = params.deficiencies.findIndex((deficiency) => deficiency.text === existentDeficiency)
                if (deficiencyIndex !== -1) params.deficiencies[deficiencyIndex].checked = true
                return existentDeficiency
            })
        }
        setSizeOfDeficiencies(params.deficiencies.filter((deficiency) => deficiency.checked).length)
    }, [])

    return (
        <div style={{  borderRadius: 6, border: '1px solid #C00405' }}>
            <div onClick={() => setOpen(!open)} style={{ cursor: 'pointer', width: '100%', padding: 8, display: 'flex', justifyContent: 'space-between'}}>
                <div>
                    Selecione
                </div>
                <div style={{ display: 'flex', gap: 5}}>
                    <div>Selecionada(s)</div>
                    <div style={{ fontWeight: 600}}>{sizeOfDeficiencies}</div>
                </div>
            </div>
            {!params.pcd ?
            <div style={{ position: 'relative' }}>
                {open ? <div onMouseLeave={() => setOpen(false)} style={{ borderEndEndRadius: 6,borderEndStartRadius: 6, background: 'white', position: 'absolute', gap: 10, top: 5, display: 'grid', border: '1px solid #C00405', padding: 8, width: '100%'}}>
                    Pessoa sem deficiencia
                </div> : <></>}
            </div>
            :
            <div style={{ position: 'relative' }}>
                {open ? <div onMouseLeave={() => setOpen(false)} style={{ borderEndEndRadius: 6,borderEndStartRadius: 6, background: 'white', position: 'absolute', gap: 10, top: 5, display: 'grid', border: '1px solid #C00405', padding: 8, width: '100%'}}>
                    {params.deficiencies.map(({ checked, text }, index) => <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                        <label htmlFor={text.toLowerCase()} style={{ fontSize: 12, fontWeight: 'normal' }}>{text}</label>
                        <input checked={checked} type="checkbox" data-index={index} onClick={checkDeficiency} name="deficiencies" id={text.toLowerCase()} />
                    </div>)}
                </div> : <></>}
            </div>}
        </div>
    )
}

export const SelectDeficienciesToMultiUser = (params: MultipleUsers) => {
    const [open, setOpen] = useState(false)
    const [sizeOfDeficiencies, setSizeOfDeficiencies] = useState(0)
    const [deficiencies, setDeficiencies] = useState([
        { text: 'Artropatia de membros superiores', checked: false },
        { text: 'Artropatia de membros inferiores', checked: false },
        { text: 'Artropatia de membros inferiores e superiores', checked: false },
        { text: 'Deficiência intelectual', checked: false },
        { text: 'Transtorno de Espectro Autista -TEA', checked: false },
        { text: 'Transtorno de Déficit de Atenção e Hiperatividade - TDAH', checked: false }
    ])

    const checkDeficiency = (event: any) => {
        let index = event.target.getAttribute('data-index')
        let updateDeficiencies = [...deficiencies]
        updateDeficiencies[index].checked = !updateDeficiencies[index].checked
        setDeficiencies(updateDeficiencies)
        params.patient.typeOfDisability = updateDeficiencies.filter(deficiency => deficiency.checked).map(deficiency => deficiency.text).toString()
        setSizeOfDeficiencies(deficiencies.filter((deficiency) => deficiency.checked).length)
    }

    useEffect(() => {
        if (params.existentData) {
            params.existentData.split(',').map(existentDeficiency => {
                let deficiencyIndex = deficiencies.findIndex((deficiency) => deficiency.text === existentDeficiency)
                if (deficiencyIndex !== -1) deficiencies[deficiencyIndex].checked = true
                return existentDeficiency
            })
        }
        setSizeOfDeficiencies(deficiencies.filter((deficiency) => deficiency.checked).length)
    }, [])

    return (
        <div style={{  borderRadius: 6, border: '1px solid #C00405', zIndex: 1 }}>
            <div onClick={() => setOpen(!open)} style={{ cursor: 'pointer', width: '100%', padding: 8, display: 'flex', justifyContent: 'space-between'}}>
                <div>
                    Selecione
                </div>
                <div style={{ display: 'flex', gap: 5}}>
                    <div>Selecionada(s)</div>
                    <div style={{ fontWeight: 600}}>{sizeOfDeficiencies}</div>
                </div>
            </div>
            {!params.pcd ?
            <div style={{ position: 'relative' }}>
                {open ? <div onMouseLeave={() => setOpen(false)} style={{ borderEndEndRadius: 6,borderEndStartRadius: 6, background: 'white', position: 'absolute', gap: 10, top: 5, display: 'grid', border: '1px solid #C00405', padding: 8, width: '100%'}}>
                    Pessoa sem deficiencia
                </div> : <></>}
            </div>
            :
            <div style={{ position: 'relative' }}>
                {open ? <div onMouseLeave={() => setOpen(false)} style={{ borderEndEndRadius: 6,borderEndStartRadius: 6, background: 'white', position: 'absolute', gap: 10, top: 5, display: 'grid', border: '1px solid #C00405', padding: 8, width: '100%'}}>
                    {deficiencies.map(({ checked, text }, index) => <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                        <label htmlFor={text.toLowerCase()} style={{ fontSize: 12, fontWeight: 'normal' }}>{text}</label>
                        <input checked={checked} type="checkbox" data-index={index} onClick={checkDeficiency} name="deficiencies" id={text.toLowerCase()} />
                    </div>)}
                </div> : <></>}
            </div>}
        </div>
    )
}