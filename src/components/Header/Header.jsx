import React from 'react'
import "./Header.scss";
import Logo from "../../assets/images/logo.png";
import { NavLink } from 'react-router-dom';

function Header() {

    function setIcon(iconPath) {
        let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
        link.type = 'image/png'; 
        link.rel = 'icon';
        link.href = iconPath;
        
        document.head.appendChild(link);
      }
      
      setIcon(Logo);
  return (
    <>
        <div className="navbar">
			<div className="navbar__container">
				<div className="navbar__logo-container">
					<NavLink to="/home">
						<img src={Logo} className="navbar__img" alt="AlteraBooks" />
					</NavLink>
				</div>
				<div className="navbar__links">
					<ul className="navbar__list">
						<li>
							<NavLink
								to="/"
								className={({ isActive }) =>
									isActive
										? "navbar__link navbar__home navbar__home--active"
										: "navbar__link navbar__home"
								}
							>
								Home
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/results"
								className={({ isActive }) =>
									isActive
										? "navbar__link navbar__results navbar__results--active"
										: "navbar__link navbar__results"
								}
							>
								Results
							</NavLink>
						</li>
					</ul>

                    
				</div>

                
			</div>

            
		</div>
        <div className= "text">
            <h1 className= "text__title" >AlteraBooks</h1>
            <h2 className= "text__subtitle">Find your next favorite book</h2>
        </div>
        
    </>
  )
}

export default Header