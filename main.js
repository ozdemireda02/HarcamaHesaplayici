//! HTML'den gelenler ;

const addBtn=document.getElementById("add-btn");
const priceInp=document.getElementById("price-inp");
const titleInp=document.getElementById("title-inp");
const checkBox=document.querySelector("#checked");
const list=document.querySelector("#list");
const totalSpan=document.querySelector("#price-info");
const select=document.querySelector("select");
const userInp=document.querySelector("#user-inp");



//! Olay izleyicileri; 

addBtn.addEventListener("click",addExpense);
list.addEventListener("click",handleUpdate);
select.addEventListener("change",handleFilter);
userInp.addEventListener("change",saveUser);
document.addEventListener("DOMContentLoaded",getUser)


// toplam fiyat bilgisi

let totalPrice = 0;

//! Fonksiyonlar ;

// hem toplam değişkenini hem de arayüzünü güncelleyen fonksiyon

function updateTotal(price){

    // js de tutulan değişkeni günceller
    totalPrice += price;

    // html deki toplam alanını günceller
    totalSpan.innerText = totalPrice;

}


// yeni harcama ekler

function addExpense(event){ 
    event.preventDefault();

    // inputların değerlerine erişme 

    const price = priceInp.valueAsNumber;
    const title = titleInp.value;
    console.log(checkBox);

    // ! 1- inputlardan biri dahi boş ise alert ver ve fonksiyonu durdur

    if(title === "" || price === ""){
        alert('Lütfen Formu Doldurunuz');
        return;
    }
    //!  2- inputlar doluysa bir kart oluştur ve html'e gönder
    // a- div oluşturma

    const expenseDiv = document.createElement("div")

    // b-class ekleme 

    expenseDiv.classList.add("expense");

    if(checkBox.checked === true){
        expenseDiv.classList.add('paid');
    }

    //  c- div'in içeriğini belirleme

    expenseDiv.innerHTML = `

    <h2 id="title">${title}</h2>
    <h2 id="price">${price}</h2>
             <div class="btns">
                 <img id="update" src="./images/money.png" alt="">
                 <img id="delete" src="./images/delete.png" alt="">
             </div>
    
    
    `

    // d- oluşan kartı html'e gönderme

    list.appendChild(expenseDiv);

    // e-toplamı güncelle

    updateTotal(price);

    
    //!  3-inputları temizle

    titleInp.value="";
    priceInp.value="";
    checkBox.checked = false;

}

// harcamayı siler/günceller

function handleUpdate(event){
    
    // tıklanılan eleman
   const ele = event.target

    // tıklanılan butonun kapsayıcısına ulaşma
    const parent = ele.parentElement.parentElement;    

    // tıklanılan elemanın id'si delete ise çalışır
    if(ele.id === "delete"){   

    // sildiğimiz elemanın fiyatına erişme 
   const price=Number(parent.children[1].innerText);

    // toplam'dan sildiğimiz fiyatı çıkarma
   updateTotal(-price);
    
    // elemanı html den kaldırma
    parent.remove();
}
    // tıklanılan eleman güncelle ise

    if(ele.id === "update"){
        parent.classList.toggle("paid");
    }

}


// note'ları filtreler

function handleFilter(event){
    const selected = event.target.value;

// listede ki elemanlara erişme
    const items = list.childNodes;

// listedeki her bir eleman için swich ile yapacağımız sorgu elemanın gözükeceğine karar verecek

items.forEach ((item) => {

    // seçilen değere göre yapılacak işleme karar verme

    switch(selected){
        case "all":
            // class ında paid olsada olmasada göster
            item.style.display="flex";
        break;
        case "paid":
            // class ında paid olmayanlar gizlenecek
            if(item.classList.contains("paid")){
              item.style.display = "flex";
            }else{
              item.style.display = "none";
            }
        break;
        case "not-paid":
            // class ında paid olanlar gizlenecek 
            if(!item.classList.contains("paid")){
                item.style.display="flex";
            }else{
                item.style.display="none";
            }
        break;      
    }

});

}


// kullanıcıyı kaydeder

function saveUser(event){
    localStorage.setItem("username",event.target.value);
}

// kullanıcıyı lokalden alıp inputa yazar

function getUser(){
// local storage dan ismi al
   const username= localStorage.getItem("username") || "";

//    kullanıcı ismini inputa aktar
    userInp.value= username;
}



