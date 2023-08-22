import { useEffect, useState } from "react";
import { Button, Collapse } from "react-bootstrap"
import { IoIosArrowForward } from "react-icons/io";
import { RiArrowDownSLine } from "react-icons/ri";
import { VscThreeBars } from "react-icons/vsc";
import { MenuOptions } from "../components/MenuOptions";
import { useNavigate } from "react-router-dom";

import './css/Faq.css'
import './css/media-layout.css'

import { validateUserSession } from "../utils/validateSession.utils";

export const Faq = () => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);

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
    useEffect(() => {
        validateUserSession(navigate)
    }, [])    
    
    const setTheme = (event: any, type: string) => {
        event.target.classList.toggle('active')
        setOpenTheme({ ...openTheme, [type]: !openTheme[type]})
    }

    return (
        <div className="faq-container">
            <hr />
            <div className='header-info'>
                <button className="options-btn" onClick={() => setOpen(!open)}>
                    <VscThreeBars size={30} />
                </button>
                <span className='header-info-title'>PERGUNTAS FREQUENTES</span>
            </div>
            <hr />
            <div className='header-icons'>
                <div className='home-icon'>
                    <span className='home-label'>ÍNICIO</span>
                    <IoIosArrowForward style={{ opacity: '.2'}} />
                </div>
                <div>
                    <span id="second" className='progress-label'>Perguntas frequentes</span>
                </div>
            </div>
            <div className="faq-themes">
                <MenuOptions open={open} />
                {
                    content.map(data => 
                        <div className="faq-theme">
                            <Button className="title" onClick={(event) => setTheme(event, data.id)} aria-controls="theme-paragraph" aria-expanded={data.ref}>
                                {data.title}
                                <RiArrowDownSLine size={30}/>
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