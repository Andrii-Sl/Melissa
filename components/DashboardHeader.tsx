"use client";

import Link from "next/link";

import {
Menu,
X,
ShoppingBag,
LogOut,
} from "lucide-react";

import styles from "@/app/dashboard/dashboard.module.css";

type Props = {
menuOpen:boolean;
setMenuOpen:(value:boolean)=>void;
cartCount?:number;
};

export default function DashboardHeader({
menuOpen,
setMenuOpen,
cartCount = 0,
}:Props) {

function handleLogout() {

localStorage.removeItem(  
  "clientPhone"  
);  

window.location.href = "/";

}

return (

<>  
  <header className={styles.header}>  

    <div className={styles.logoWrap}>  

      <div className={styles.logo}>  
        L  
      </div>  

      <div>  

        <div className={styles.brand}>  
          AutoParts-EU 
        </div>  

        <div className={styles.subBrand}>  
          Клиентская панель  
        </div>  

      </div>  

    </div>  

    <div className={styles.headerActions}>  

      <Link  
        href="/dashboard/cart"  
        className={styles.cartButton}  
      >  

        <ShoppingBag  
          size={20}  
          strokeWidth={2.4}  
        />  

        {  
          cartCount > 0 && (  

            <span  
              className={styles.cartBadge}  
            >  
              {cartCount}  
            </span>  

          )  
        }  

      </Link>  

      <button  
        type="button"  
        className={styles.burger}  
        onClick={() =>  
          setMenuOpen(  
            !menuOpen  
          )  
        }  
      >  

        {  
          menuOpen ? (  

            <X  
              size={24}  
              strokeWidth={2.4}  
            />  

          ) : (  

            <Menu  
              size={24}  
              strokeWidth={2.4}  
            />  

          )  
        }  

      </button>  

    </div>  

  </header>  

  {  
    menuOpen && (  

      <div className={styles.mobileMenu}>  

        <Link  
          href="/dashboard"  
          className={styles.mobileMenuItem}  
        >  
          Главная  
        </Link>  

        <Link  
          href="/dashboard/profile"  
          className={styles.mobileMenuItem}  
        >  
          Профиль  
        </Link>  

        <Link  
          href="/dashboard/requests"  
          className={styles.mobileMenuItem}  
        >  
          Запросы  
        </Link>  

        <Link  
          href="/dashboard/offers"  
          className={styles.mobileMenuItem}  
        >  
          Предложения  
        </Link>  

        <Link  
          href="/dashboard/orders"  
          className={styles.mobileMenuItem}  
        >  
          Заказы  
        </Link>  

        <button  
          type="button"  
          className={styles.mobileLogout}  
          onClick={handleLogout}  
        >  

          <LogOut  
            size={18}  
            strokeWidth={2.4}  
          />  

          Выйти  

        </button>  

      </div>  

    )  
  }  

</>

);
}