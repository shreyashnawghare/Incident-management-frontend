import './Header.css'

export default function Header() {
    return (
        <div className='header'>
            <div className='header__title'>
                <span className='header__sm__span'></span>
                <span className='header__lg__span' ></span>
            </div>
            <img className='header__img' src='https://images.pexels.com/photos/3568520/pexels-photo-3568520.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'></img>
        </div>
    )
}
