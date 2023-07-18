import { useState } from "react";
import { Button, Collapse } from "react-bootstrap"
import { BsInfoCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import './css/Faq.css'
import './css/media-layout.css'
import { IoIosArrowForward, IoIosHome } from "react-icons/io";
import { RiArrowDownSLine } from "react-icons/ri";

export const Faq = () => {
    const navigate = useNavigate();

    const [openTheme, setOpenTheme] = useState<any>({
        'theme-1': false,
        'theme-2': false,
        'theme-3': false,
        'theme-4': false,
        'theme-5': false,
        'theme-6': false,
        'theme-7': false,
        'theme-8': false 
    });
    const content = [
        {
            id: 'theme-1',
            ref: openTheme["theme-1"],
            title: 'O que é hemofilia e como ela é causada?',
            paragrafh: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae porta eros, ut rutrum arcu. Ut convallis non lorem a malesuada. Duis sodales enim ac ullamcorper maximus. Quisque et neque pellentesque libero porta iaculis. Nulla nec pellentesque lacus, vitae imperdiet lectus. Sed mollis sagittis urna, eget commodo nulla fermentum ut. Proin hendrerit sollicitudin dui, eu aliquet ex mattis sit amet. Vivamus tristique aliquet porttitor. Suspendisse ut ex a odio posuere volutpat a sit amet metus. Quisque efficitur tellus et ligula scelerisque interdum. Nullam ullamcorper maximus leo, at tristique ligula commodo ac. Duis mi felis, consequat hendrerit ligula id, pellentesque pulvinar lacus. Morbi vel pretium lorem, eu fermentum lectus.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae porta eros, ut rutrum arcu. Ut convallis non lorem a malesuada. Duis sodales enim ac ullamcorper maximus. Quisque et neque pellentesque libero porta iaculis. Nulla nec pellentesque lacus, vitae imperdiet lectus. Sed mollis sagittis urna, eget commodo nulla fermentum ut. Proin hendrerit sollicitudin dui, eu aliquet ex mattis sit amet. Vivamus tristique aliquet porttitor. Suspendisse ut ex a odio posuere volutpat a sit amet metus. Quisque efficitur tellus et ligula scelerisque interdum. Nullam ullamcorper maximus leo, at tristique ligula commodo.`
        },
        {
            id: 'theme-2',
            ref: openTheme["theme-2"],
            title: 'O que é hemofilia e como ela é causada?',
            paragrafh: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae porta eros, ut rutrum arcu. Ut convallis non lorem a malesuada. Duis sodales enim ac ullamcorper maximus. Quisque et neque pellentesque libero porta iaculis. Nulla nec pellentesque lacus, vitae imperdiet lectus. Sed mollis sagittis urna, eget commodo nulla fermentum ut. Proin hendrerit sollicitudin dui, eu aliquet ex mattis sit amet. Vivamus tristique aliquet porttitor. Suspendisse ut ex a odio posuere volutpat a sit amet metus. Quisque efficitur tellus et ligula scelerisque interdum. Nullam ullamcorper maximus leo, at tristique ligula commodo ac. Duis mi felis, consequat hendrerit ligula id, pellentesque pulvinar lacus. Morbi vel pretium lorem, eu fermentum lectus.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae porta eros, ut rutrum arcu. Ut convallis non lorem a malesuada. Duis sodales enim ac ullamcorper maximus. Quisque et neque pellentesque libero porta iaculis. Nulla nec pellentesque lacus, vitae imperdiet lectus. Sed mollis sagittis urna, eget commodo nulla fermentum ut. Proin hendrerit sollicitudin dui, eu aliquet ex mattis sit amet. Vivamus tristique aliquet porttitor. Suspendisse ut ex a odio posuere volutpat a sit amet metus. Quisque efficitur tellus et ligula scelerisque interdum. Nullam ullamcorper maximus leo, at tristique ligula commodo.`
        },
        {
            id: 'theme-3',
            ref: openTheme["theme-3"],
            title: 'O que é hemofilia e como ela é causada?',
            paragrafh: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae porta eros, ut rutrum arcu. Ut convallis non lorem a malesuada. Duis sodales enim ac ullamcorper maximus. Quisque et neque pellentesque libero porta iaculis. Nulla nec pellentesque lacus, vitae imperdiet lectus. Sed mollis sagittis urna, eget commodo nulla fermentum ut. Proin hendrerit sollicitudin dui, eu aliquet ex mattis sit amet. Vivamus tristique aliquet porttitor. Suspendisse ut ex a odio posuere volutpat a sit amet metus. Quisque efficitur tellus et ligula scelerisque interdum. Nullam ullamcorper maximus leo, at tristique ligula commodo ac. Duis mi felis, consequat hendrerit ligula id, pellentesque pulvinar lacus. Morbi vel pretium lorem, eu fermentum lectus.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae porta eros, ut rutrum arcu. Ut convallis non lorem a malesuada. Duis sodales enim ac ullamcorper maximus. Quisque et neque pellentesque libero porta iaculis. Nulla nec pellentesque lacus, vitae imperdiet lectus. Sed mollis sagittis urna, eget commodo nulla fermentum ut. Proin hendrerit sollicitudin dui, eu aliquet ex mattis sit amet. Vivamus tristique aliquet porttitor. Suspendisse ut ex a odio posuere volutpat a sit amet metus. Quisque efficitur tellus et ligula scelerisque interdum. Nullam ullamcorper maximus leo, at tristique ligula commodo.`
        },
        {
            id: 'theme-4',
            ref: openTheme["theme-4"],
            title: 'O que é hemofilia e como ela é causada?',
            paragrafh: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae porta eros, ut rutrum arcu. Ut convallis non lorem a malesuada. Duis sodales enim ac ullamcorper maximus. Quisque et neque pellentesque libero porta iaculis. Nulla nec pellentesque lacus, vitae imperdiet lectus. Sed mollis sagittis urna, eget commodo nulla fermentum ut. Proin hendrerit sollicitudin dui, eu aliquet ex mattis sit amet. Vivamus tristique aliquet porttitor. Suspendisse ut ex a odio posuere volutpat a sit amet metus. Quisque efficitur tellus et ligula scelerisque interdum. Nullam ullamcorper maximus leo, at tristique ligula commodo ac. Duis mi felis, consequat hendrerit ligula id, pellentesque pulvinar lacus. Morbi vel pretium lorem, eu fermentum lectus.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae porta eros, ut rutrum arcu. Ut convallis non lorem a malesuada. Duis sodales enim ac ullamcorper maximus. Quisque et neque pellentesque libero porta iaculis. Nulla nec pellentesque lacus, vitae imperdiet lectus. Sed mollis sagittis urna, eget commodo nulla fermentum ut. Proin hendrerit sollicitudin dui, eu aliquet ex mattis sit amet. Vivamus tristique aliquet porttitor. Suspendisse ut ex a odio posuere volutpat a sit amet metus. Quisque efficitur tellus et ligula scelerisque interdum. Nullam ullamcorper maximus leo, at tristique ligula commodo.`
        },
        {
            id: 'theme-5',
            ref: openTheme["theme-5"],
            title: 'O que é hemofilia e como ela é causada?',
            paragrafh: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae porta eros, ut rutrum arcu. Ut convallis non lorem a malesuada. Duis sodales enim ac ullamcorper maximus. Quisque et neque pellentesque libero porta iaculis. Nulla nec pellentesque lacus, vitae imperdiet lectus. Sed mollis sagittis urna, eget commodo nulla fermentum ut. Proin hendrerit sollicitudin dui, eu aliquet ex mattis sit amet. Vivamus tristique aliquet porttitor. Suspendisse ut ex a odio posuere volutpat a sit amet metus. Quisque efficitur tellus et ligula scelerisque interdum. Nullam ullamcorper maximus leo, at tristique ligula commodo ac. Duis mi felis, consequat hendrerit ligula id, pellentesque pulvinar lacus. Morbi vel pretium lorem, eu fermentum lectus.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae porta eros, ut rutrum arcu. Ut convallis non lorem a malesuada. Duis sodales enim ac ullamcorper maximus. Quisque et neque pellentesque libero porta iaculis. Nulla nec pellentesque lacus, vitae imperdiet lectus. Sed mollis sagittis urna, eget commodo nulla fermentum ut. Proin hendrerit sollicitudin dui, eu aliquet ex mattis sit amet. Vivamus tristique aliquet porttitor. Suspendisse ut ex a odio posuere volutpat a sit amet metus. Quisque efficitur tellus et ligula scelerisque interdum. Nullam ullamcorper maximus leo, at tristique ligula commodo.`
        },
        {
            id: 'theme-6',
            ref: openTheme["theme-6"],
            title: 'O que é hemofilia e como ela é causada?',
            paragrafh: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae porta eros, ut rutrum arcu. Ut convallis non lorem a malesuada. Duis sodales enim ac ullamcorper maximus. Quisque et neque pellentesque libero porta iaculis. Nulla nec pellentesque lacus, vitae imperdiet lectus. Sed mollis sagittis urna, eget commodo nulla fermentum ut. Proin hendrerit sollicitudin dui, eu aliquet ex mattis sit amet. Vivamus tristique aliquet porttitor. Suspendisse ut ex a odio posuere volutpat a sit amet metus. Quisque efficitur tellus et ligula scelerisque interdum. Nullam ullamcorper maximus leo, at tristique ligula commodo ac. Duis mi felis, consequat hendrerit ligula id, pellentesque pulvinar lacus. Morbi vel pretium lorem, eu fermentum lectus.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae porta eros, ut rutrum arcu. Ut convallis non lorem a malesuada. Duis sodales enim ac ullamcorper maximus. Quisque et neque pellentesque libero porta iaculis. Nulla nec pellentesque lacus, vitae imperdiet lectus. Sed mollis sagittis urna, eget commodo nulla fermentum ut. Proin hendrerit sollicitudin dui, eu aliquet ex mattis sit amet. Vivamus tristique aliquet porttitor. Suspendisse ut ex a odio posuere volutpat a sit amet metus. Quisque efficitur tellus et ligula scelerisque interdum. Nullam ullamcorper maximus leo, at tristique ligula commodo.`
        },
        {
            id: 'theme-7',
            ref: openTheme["theme-7"],
            title: 'O que é hemofilia e como ela é causada?',
            paragrafh: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae porta eros, ut rutrum arcu. Ut convallis non lorem a malesuada. Duis sodales enim ac ullamcorper maximus. Quisque et neque pellentesque libero porta iaculis. Nulla nec pellentesque lacus, vitae imperdiet lectus. Sed mollis sagittis urna, eget commodo nulla fermentum ut. Proin hendrerit sollicitudin dui, eu aliquet ex mattis sit amet. Vivamus tristique aliquet porttitor. Suspendisse ut ex a odio posuere volutpat a sit amet metus. Quisque efficitur tellus et ligula scelerisque interdum. Nullam ullamcorper maximus leo, at tristique ligula commodo ac. Duis mi felis, consequat hendrerit ligula id, pellentesque pulvinar lacus. Morbi vel pretium lorem, eu fermentum lectus.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae porta eros, ut rutrum arcu. Ut convallis non lorem a malesuada. Duis sodales enim ac ullamcorper maximus. Quisque et neque pellentesque libero porta iaculis. Nulla nec pellentesque lacus, vitae imperdiet lectus. Sed mollis sagittis urna, eget commodo nulla fermentum ut. Proin hendrerit sollicitudin dui, eu aliquet ex mattis sit amet. Vivamus tristique aliquet porttitor. Suspendisse ut ex a odio posuere volutpat a sit amet metus. Quisque efficitur tellus et ligula scelerisque interdum. Nullam ullamcorper maximus leo, at tristique ligula commodo.`
        },
        {
            id: 'theme-8',
            ref: openTheme["theme-8"],
            title: 'O que é hemofilia e como ela é causada?',
            paragrafh: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae porta eros, ut rutrum arcu. Ut convallis non lorem a malesuada. Duis sodales enim ac ullamcorper maximus. Quisque et neque pellentesque libero porta iaculis. Nulla nec pellentesque lacus, vitae imperdiet lectus. Sed mollis sagittis urna, eget commodo nulla fermentum ut. Proin hendrerit sollicitudin dui, eu aliquet ex mattis sit amet. Vivamus tristique aliquet porttitor. Suspendisse ut ex a odio posuere volutpat a sit amet metus. Quisque efficitur tellus et ligula scelerisque interdum. Nullam ullamcorper maximus leo, at tristique ligula commodo ac. Duis mi felis, consequat hendrerit ligula id, pellentesque pulvinar lacus. Morbi vel pretium lorem, eu fermentum lectus.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae porta eros, ut rutrum arcu. Ut convallis non lorem a malesuada. Duis sodales enim ac ullamcorper maximus. Quisque et neque pellentesque libero porta iaculis. Nulla nec pellentesque lacus, vitae imperdiet lectus. Sed mollis sagittis urna, eget commodo nulla fermentum ut. Proin hendrerit sollicitudin dui, eu aliquet ex mattis sit amet. Vivamus tristique aliquet porttitor. Suspendisse ut ex a odio posuere volutpat a sit amet metus. Quisque efficitur tellus et ligula scelerisque interdum. Nullam ullamcorper maximus leo, at tristique ligula commodo.`
        },
    ]
    
    const setTheme = (event: any, type: string) => {
        event.target.classList.toggle('active')
        setOpenTheme({ ...openTheme, [type]: !openTheme[type]})
    }

    return (
        <div className="faq-container">
            <hr />
            <div className='header-info'>
                <span className='header-info-title'>PERGUNTAS FREQUENTES</span>
                <button className='help-info' onClick={() => navigate('/faq')}>
                    <span>AJUDA</span>
                    <BsInfoCircle size={20}/>
                </button>
            </div>
            <hr />
            <div className='header-icons'>
                <div className='home-icon'>
                    <IoIosHome size={20} style={{ color: '#555555', margin: '2px'}} />
                    <span className='home-label'>HOME</span>
                    <IoIosArrowForward style={{ opacity: '.2', margin: '2px'}} />
                </div>
                <div>
                    <span id="second" className='progress-label'>Perguntas frequentes</span>
                </div>
            </div>
            <hr className="hr-separator"/>
            <div className="faq-themes">
                {
                    content.map(data => 
                        <div className="faq-theme">
                            <Button className="title" onClick={(event) => setTheme(event, data.id)} aria-controls="theme-paragraph" aria-expanded={data.ref}>
                                {data.title}
                                <RiArrowDownSLine />
                            </Button>
                            <Collapse in={data.ref}>
                                <div className="theme-paragraph">
                                    {data.paragrafh}
                                </div>
                            </Collapse>
                        </div>
                    )
                }
            </div>
        </div>
    )
}