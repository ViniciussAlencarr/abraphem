import { useState } from "react";
import { Button, Collapse } from "react-bootstrap"
import { RiArrowDownSLine } from "react-icons/ri";
import { VscThreeBars } from "react-icons/vsc";
import { MenuOptions } from "../components/MenuOptions";

import './css/Faq.css'
import './css/media-layout.css'


export const Faq = () => {
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
            title: 'Quem é a Ouvidoria da Hemofilia - ABRAPHEM',
            paragrafh: <>A Ouvidoria da Hemofilia ABRAPHEM constitui-se num espaço estratégico e democrático de comunicação entre a corrente que engloba a pessoa com hemofilia e a ABRAPHEM, visando o fortalecimento dos <br/>
mecanismos de participação destes, e o processo da construção do Advocacy em políticas públicas.<br/>
<br/>
Com isto, inaugura um espaço inédito no âmbito do controle social, que oferece um local legitimamente democrático para dar voz principalmente aos pacientes, que os apoiará nas resoluções de suas barreiras na<br/>
vivência da patologia, e outros que englobam a corrente de apoio e tratamento, além de receber proposituras
para ações proativas na melhoria do tratamento e acesso, mesmo em localidades remotas</>
        },
        {
            id: 'theme-2',
            ref: openTheme["theme-2"],
            title: 'Quais dados podem ser tratados pela Ouvidoria da Hemofilia - ABRAPHEM?',
            paragrafh: <>Ouvidoria da Hemofilia - ABRAPHEM realiza o tratamento de dados conforme a legislação aplicável. <br/>
Inicialmente, pode tratar os dados que são coletados, tais como:<br/>
<br/>
Dados Pessoais Cadastrais, alguns desses dados são fornecidos por você para autenticação ao se cadastrar no site da ABRAPHEM e podem ser colhidos pela Ouvidoria da Hemofilia - ABRAPHEM por diversas fontes.<br/>
O seu dado de documento será mantido em nossa base de dados segura, podendo ser utilizadas exclusivamente para validar a sua identidade, inclusive nas soluções de autenticação e prevenção a fraudes.<br/>
Dentre os dados pessoais sensíveis que poderão ser coletados, citam-se: relatos de saúde, registros médicos, orientação religiosa, opiniões políticas (partidárias ou apartidárias), filiação a Sindicato ou Organização, dados<br/>
genéticos, estrutura familiar, dados biométricos, entre outros.</>
        },
        {
            id: 'theme-3',
            ref: openTheme["theme-3"],
            title: 'Quais as finalidades do tratamento dos Dados Pessoais tratados pela Ouvidoria da Hemofilia - ABRAPHEM?',
            paragrafh: <>
Os Dados Pessoais coletados, por meio desta plataforma, serão utilizados para atualização da nossa base de dados e como insumos para nossas soluções, terão as seguintes finalidades:<br/>
<br/>
Proteção ao Associado/seus familiares ou pessoas físicas ou jurídicas que adentram no site da Ouvidoria da Hemofilia – ABRAPHEM<br/>
<br/>
Identificação da sua identidade para prevenção a fraudes, tanto pela Ouvidoria da Hemofilia - ABRAPHEM quanto por seus assistidos;<br/>
Aprimoramento da qualidade de dados;<br/>
Ao acessar os Site da Ouvidoria da Hemofilia - ABRAPHEM, você tem ciência e concorda que iremos coletar, utilizar, armazenar e tratar, pelo prazo de 15 (quinze) anos, os Dados Pessoais para as finalidades de Proteção,<br/>
Identificação e autenticação da sua identidade para prevenção a fraudes e Aprimoramento da qualidade de dados.<br/>
<br/>
Análise e composição de modelos estatísticos para finalidade de análise de risco, prevenção a fraudes e para subsidiar a elaboração de propostas de melhorias para a Ouvidoria da Hemofilia - ABRAPHEM e parcerias.<br/>
<br/>
Ao acessar o Site você tem ciência que iremos coletar, utilizar, armazenar e tratar os Dados Pessoais para as finalidades de Proteção De seus dados, Identificação e autenticação da sua identidade para prevenção a<br/>
fraudes, Aprimoramento da qualidade de dados, Análise e composição de modelos estatísticos.<br/>
<br/>
O endereço completo informado por você poderá ser utilizado para realização de ações de políticas públicas, promover e incentivar a Ouvidoria da Hemofilia - ABRAPHEM, tais como o envio de estatísticas e<br/>
acompanhamento de seu processo, denúncia ou de suas sugestões;<br/>
<br/>
Retirada de dúvidas;<br/>
<br/>
Publicação de depoimentos e notificações, de modo a potencializar a visibilidade nacional do combate à desinformação e inserção de novas políticas sociais para a hemofilIa;<br/>
Elaboração de notícias e artigos;<br/>
Participação em eventos e congressos;<br/>
Campanhas de projetos da ABRAPHEM;<br/>
Manutenção de relacionamento com parceiros e associados;<br/>
Comunicação com as ONGs associadas para informar sobre posicionamentos da Organização;<br/>
Articulação para campanhas nacionais e estratégias de influência política em benefício à saúde dos pacientes;<br/>
Aperfeiçoar o atendimento ao usuário.<br/>
Destaca-se que o rol de hipóteses acima é meramente exemplificativo, podendo haver a utilização dos dados para outras finalidades, desde que vinculadas à missão e aos objetivos da Ouvidoria.<br/>
<br/>
A Ouvidoria da Hemofilia - ABRAPHEM esclarece que armazena os dados em ambientes seguros e possui prazo de retenção e descarte determinados de acordo com a legislação aplicável, condições contratuais e<br/>
Políticas Internas da Ouvidoria da Hemofilia – ABRAPHEM.<br/>
</>
        },
        {
            id: 'theme-4',
            ref: openTheme["theme-4"],
            title: 'Quais as hipóteses de tratamento aplicáveis para o tratamento de Dados Pessoais?',
            paragrafh: <>A fim de garantir a conformidade com a Lei de Proteção de Dados Pessoais (LGPD), toda operação realizada com seus Dados Pessoais está amparada em uma hipótese de tratamento, como a proteção de dados <br />
pessoais; o legítimo interesse da Ouvidoria da Hemofilia - ABRAPHEM, conforme o caso de seus assistidos ou parceiros; o cumprimento de obrigação regulatória/legal ou o consentiment</>
        },
        {
            id: 'theme-5',
            ref: openTheme["theme-5"],
            title: ' A quem a Ouvidoria da Hemofilia - ABRAPHEM pode disponibilizar os Dados Pessoais?',
            paragrafh: <>Tratamos apenas os Dados Pessoais que entendemos serem os mínimos necessários para cada finalidade e, em razão disso, disponibilizamos seus Dados Pessoais apenas para as pessoas e empresas que consultam <br/>
nossos serviços para as finalidades descritas no item 3 acima.<br/>
Também podemos disponibilizar os Dados Pessoais, quando estritamente necessário, tudo amparado pela lei geral de proteção de dados.<br/>
Havendo necessidade de coleta de dados pessoais para quaisquer razões secundárias, não previstas em lei e não explicitadas dentre as finalidades, a ABRAPHEM solicitará consentimento específico ao Usuário ou a seu<br/>
representante legal.<br/>
<br/>
A ABRAPHEM resguarda seu direito a fornecer os dados do Usuário para adimplemento de obrigação legal ou processual, caso assim determinado por autoridades judiciais, administrativas ou fiscais, mediante notificação<br/>
aos titulares de dados.</>
        },
        {
            id: 'theme-6',
            ref: openTheme["theme-6"],
            title: ' Requisito de acesso aos serviços on-line da Ouvidoria da Hemofilia - ABRAPHEM.',
            paragrafh: <>Você é responsável pela exatidão, pela veracidade e pela atualização dos Dados Pessoais informados, concordando que eventuais divergências e/ou inconsistências desses dados poderão ocasionar a não <br/>
validação da sua identidade, o que poderá impedir o acesso.</>
        },
        {
            id: 'theme-7',
            ref: openTheme["theme-7"],
            title: 'Condições específicas das soluções da Ouvidoria da Hemofilia - ABRAPHEM.',
            paragrafh: <>
A importância de implantar a Ouvidoria Brasileira da Hemofilia é estabelecer um canal de manifestação do público alvo, configurando-se, assim, como um mecanismo de exercício da cidadania e meio estratégico de <br />
apoio à gestão das organizações, seja na melhoria da qualidade dos serviços oferecidos, seja para atender às crescentes necessidades de transparência, políticas públicas, arejamento e revisão de processos impostos no<br />
fluxo do tratamento propostos pelo Ministério da Saúde no que tange a Hemofilia e as Coagulopatias Hereditárias.<br />
<br />
A Ouvidoria da Hemofilia surge como uma estratégia da participação e da consolidação dos associados no engajamento com a ABRAPHEM, que juntos atuam na redução de riscos e de insatisfações, estreitando o<br />
relacionamento da ABRAPHEM com seu público-alvo. O engajamento com o público-alvo difundirá o nome da associação cada vez mais, e fortalecerá a credibilidade com que a ABRAPHEM vem desenvolvendo ações<br />
diretas que têm como objetivo final a plenitude do bem-estar dos pacientes.<br />
<br />
Os atendimentos realizados pela ouvidoria, por meio das manifestações e sugestões gerenciadas, resultarão no aprimoramento de rotinas e processos de trabalho, além do exercício da cidadania e materialização do<br />
princípio da transparência, instrumento efetivo de gestão, para entender os desafios enfrentados por todos que de alguma forma vivem, tratam, lidam e estudam sobre as coagulopatias hereditárias, inclusive<br />
denúncias, gerando uma oferta do atendimento qualificado aos usuários e cidadãos.<br />
</>
        },
        {
            id: 'theme-8',
            ref: openTheme["theme-8"],
            title: 'Responsabilidade pelo armazenamento dos Dados Pessoais.',
            paragrafh: <>Os seus Dados Pessoais são armazenados em nosso sistema ou em sistema de terceiro regularmente contratado pela Ouvidoria Brasileira da Hemofilia - ABRAPHEM , para fins legais e comerciais, conforme <br/>
esclarecido neste documento, sendo sua responsável a Associação Brasileira de Pessoas com Hemofilia – ABRAPHEM, inscrita no CPNJ sob o nº 32.185.835/0001-50, com sede na Al.Santiago, 284 – Alphaville, Santana<br/>
de Parnaíba - SP, com a proteção dos dados pessoais que coleta de seus cadastrados, pessoas com coagulopatias, familiares, profissionais da saúde e visitantes (familiares e terceiros); esclarecendo as regras<br/>
sobre a coleta, registro, armazenamento, uso, compartilhamento, enriquecimento e eliminação dos dados coletados, dentro do escopo dos serviços prestados pela ABRAPHEM, de acordo com as leis em vigor, em<br/>
especial a Lei nº 13.709/2018 (“Lei Geral de Proteção de Dados Pessoais”).</>
        },
        {
            id: 'theme-9',
            ref: openTheme["theme-9"],
            title: 'Seus direitos sobre o tratamento de seus Dados Pessoais.',
            paragrafh: <>Direito de Acesso, Atualização, Correção e Exclusão: <br/>
Você pode solicitar acesso aos Dados Pessoais que mantemos sobre você e solicitar a sua atualização, correção e, para a finalidade de análise para o direcionamento de novas informações e para aqueles Dados
captados com o seu Consentimento, a sua exclusão. <br/>
Para isso, você deve apresentar seu pedido por escrito, gratuitamente, no campo dentro do site da Ouvidoria Brasileira da Hemofilia - ABRAPHEM. É importante ressaltar que, em alguns casos, se você pedir para corrigir, <br/>
alterar ou excluir os Dados Pessoais, nem sempre poderemos fazê-lo. Se for esse o caso, explicaremos o porquê, como, por exemplo, quando os Dados Pessoais são necessários para proteção, autenticação e  <br/>
prevenção a fraudes e aprimoramento da qualidade dos Dados tratados pela Ouvidoria Brasileira da Hemofilia - ABRAPHEM, conforme a legislação aplicável. <br/>
<br/>
Direito de revogação de Consentimento: <br/>
Você poderá revogar o seu Consentimento em relação aos Dados Pessoais captados durante a autenticação, por meio das soluções da Ouvidoria Brasileira da Hemofilia - ABRAPHEM. <br/>
O pedido de revogação de Consentimento poderá ser realizado de forma gratuita, mediante solicitação escrita em qualquer um dos seguintes canais: <br/>
        <ul>
            <li>(i) entrega na sede ABRAPHEM; </li>
            <li>(ii) envio ao endereço sede na Al. Santiago, 284 – Alphaville, Santana de Parnaíba - SP;</li>
            <li>(iii) de forma on-line, pelo e-mail <a href='mailto:ouvidoria@abraphem.org.br'>ouvidoria@abraphem.org.br</a></li>
        </ul>
Para deixar de receber nossas campanhas promocionais e solicitações para participação em pesquisas por meios eletrônicos, como e-mail ou SMS, Você deve entrar em contato com a Central de Atendimento da <br/>
ABRAPHEM, cujos números telefônicos e horários de funcionamento encontram-se disponíveis no item 16 deste documento. Você ainda pode entrar em contato conosco se tiver dúvidas ou preocupações.</>
        },
        {
            id: 'theme-10',
            ref: openTheme["theme-10"],
            title: 'Responsabilidade pelo cadastro e acesso',
            paragrafh: <>Você poderá acessar a página da Ouvidoria Brasileira da Hemofilia - ABRAPHEM, através do site <a target="_blank" href="https://abraphem.org.br/ouvidoria">www.abraphem.org.br/ouvidoria</a></>
        },
        {
            id: 'theme-11',
            ref: openTheme["theme-11"],
            title: 'Como a ABRAPHEM opera com dados de crianças e adolescentes?',
            paragrafh: <>A ABRAPHEM opera através de autorização prévia dos pais ou responsáveis. Os dados e informações de menores de idade poderão ser coletados, todavia, mediante outorga de consentimento de pais ou <br/>
responsáveis com a anuência deles ao final deste termo.</>
        },
        {
            id: 'theme-12',
            ref: openTheme["theme-12"],
            title: 'Compromisso AntiSpam e Antiphishing',
            paragrafh: <>Atuamos de acordo com as boas práticas do mercado digital. Por isso, recomendamos que, caso você receba um e-mail em nosso nome e suspeite de fraude, não abra os arquivos anexos e nem clique em qualquer link<br/>
ou botão. Você poderá enviar uma mensagem para ouvidoria@abraphem.org.br para que possamos tomar as medidas possíveis no combate ao crime eletrônico.<br/>
Importante: este endereço de e-mail somente aceita mensagens referentes a fraudes, denúncias e informações sobre possíveis irregularidades ocorridas em nome da Ouvidoria da Hemofilia - ABRAPHEM. Caso<br/>
tenha alguma dúvida ou queira obter informações sobre outros assuntos, entre em contato com os canais de atendimento descritos no item 16, abaixo.</>
        },
        {
            id: 'theme-13',
            ref: openTheme["theme-13"],
            title: 'Relacionamento com terceiro',
            paragrafh: <>Ao contratar outras empresas para nos prestarem serviços, exigimos delas garantias de privacidade e segurança compatíveis com as que asseguramos neste documento. Para a sua segurança, quaisquer<br/>
conteúdos que sejam considerados confidenciais (como alteração de dados) não são enviados por meio de links.<br/>
<br/>
É possível que os nossos Sites e/ou nossos aplicativos mantenham links com outros websites para auxiliar você com determinada funcionalidade ou conteúdo. Não nos responsabilizamos por serviços, procedimentos e<br/>
políticas específicas de websites de outras empresas. Para a sua segurança, você deve se informar sobre o termo de privacidade de cada website.</>
        },
        {
            id: 'theme-14',
            ref: openTheme["theme-14"],
            title: 'Segurança de Dados.',
            paragrafh: <>Protegemos a segurança durante o acesso aos nossos Sites, nas transações e na captação de informações, por meio do processo de criptografia dos dados, utilizando o protocolo de segurança Secure Socket Layers (SSL)<br/>
que comprova a autenticidade dos nossos sites, assim como assegura a integridade e a confidencialidade dos dados durante a sua transmissão.</>
        },
        {
            id: 'theme-15',
            ref: openTheme["theme-15"],
            title: 'Direitos Autorais.',
            paragrafh: <>Todos os textos, imagens, sons e/ou aplicativos exibidos nos nossos Sites são protegidos por direitos autorais. <br/>
Não é permitido modificar, reproduzir, armazenar, transmitir, copiar, distribuir ou utilizar esses recursos de quaisquer outras formas para fins comerciais sem o nosso consentimento prévio e formal, o qual nunca será
presumido.<br/>
Tentativas de invasão aos nossos sites serão consideradas como dano, roubo ou qualquer outra tipificação penal que corresponda às consequências da invasão.</>
        },
        {
            id: 'theme-16',
            ref: openTheme["theme-16"],
            title: 'Alterações deste Documento',
            paragrafh: <>Este Documento está sujeito a alterações a qualquer momento. Toda e qualquer alteração visa a se adequar às<br/>
eventuais modificações em nossos Sites, sejam de mudanças para novas tecnologias ou sempre que for necessário, bem como a novos requisitos legais, regulatórios e contratuais. Quando isso acontecer,<br/>
informaremos a alteração por envio de e-mail ao endereço informado por você e/ou no seu próximo acesso aos nossos sites ou aplicativos.<br/>
Caso você não concorde com as alterações incluídas no documento, você tem direito de solicitar o cancelamento de seu cadastro a qualquer tempo.</>
        },
        {
            id: 'theme-17',
            ref: openTheme["theme-17"],
            title: 'Canais de Atendimento',
            paragrafh: <>
A Ouvidoria da Hemofilia ABRAPHEM disponibiliza canais de atendimento e de ouvidoria gratuitos. Nesta plataforma você pode obter informações, 
oferecer sugestões e reclamações.<br/>
Você também pode entrar em contato por meio do telefone (11) 93767-9124 o pelo email: <a href='mailto:ouvidoria@abraphem.org.br'>ouvidoria@abraphem.org.br</a></>
        },
    ]
    
    const setTheme = (event: any, type: string) => {
        event.target.classList.toggle('active')
        setOpenTheme({ ...openTheme, [type]: !openTheme[type]})
    }

    const classNames = (...classes: any[]) => classes.filter(Boolean).join(' ')

    return (
        <div className="faq-container">
            <MenuOptions open={open} />
            <hr />
            <div className='header-info'>
                <button className="options-btn" onClick={() => setOpen(!open)}>
                    <VscThreeBars size={30} />
                </button>
                <span className='header-info-title'>PERGUNTAS FREQUENTES</span>
            </div>
            <hr />
            <div className="faq-themes">
                
                {
                    content.map(data => 
                        <div className="faq-theme">
                            <Button className="title" onClick={(event) => setTheme(event, data.id)} aria-controls="theme-paragraph" aria-expanded={data.ref}>
                                {data.title}
                                <RiArrowDownSLine size={30}/>
                            </Button>
                            <Collapse in={data.ref} className={classNames('[&.collapse]:visible')}>
                                <div className="theme-paragraph font-medium font-sans">
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