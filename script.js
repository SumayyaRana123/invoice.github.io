
const image =document.querySelector("#image-input");
const imageLabel=document.querySelector("#lbl-image");
const btnAddItem=document.querySelector('#add-item');
invoiceItemsContainer=document.querySelector('.invoice-item-container');
invoiceItems=document.querySelector('.invoice-items');
const rate=document.querySelectorAll('#rate');
const amount=document.querySelectorAll('#amount');
const quantity=document.querySelectorAll('#quantity');
const imageContainer=document.querySelector('.right-header');
const btnGeneratePDf=document.querySelector('#btn');
const subTotal=document.querySelector('#lbl-subTotal');
const gst=document.querySelector('#lbl-gst');
const total=document.querySelector('#lbl-total');
const balanceDue=document.querySelector('#lbl-balanceDue');

let activeImage=false;


const iItemContainer="";
let uploadedImage="";
let iItemIndex=0;
imageContainer.addEventListener('click',function(e)
{ 
  if(activeImage==true)
  {
  image.click();
  }
})
image.addEventListener("change",function(){
    const Reader =new FileReader();
    Reader.addEventListener("load",()=>{
        uploadedImage=Reader.result;
        document.querySelector(".right-header").style.backgroundImage= `url(${uploadedImage})`;
        imageLabel.style.visibility="hidden";
    });
    Reader.readAsDataURL(this.files[0]);
    activeImage=true;
})
btnAddItem.addEventListener('click',function(e)
{
  const container=document.querySelector('.invoice-item-container');
   const div= document.createElement('div');
   div.classList.add('invoice-items');
   div.innerHTML+=`<div class="delete-item i-item" > 
   <i class="fa fa-trash"id="trash" style="font-size:24px"></i>
 </div>
 <div class="description i-item">
   <input type="text" name="item-description" id="item-description" placeholder="Item Desciption">
   <textarea type="text" name="item-details" id="item-details" placeholder="Item Details"></textarea>
 </div>
 <div class="rate i-item">
   <input name="rate" id="rate" placeholder="0.00">
 </div>
 <div class="quantity i-item">
   <input  name="quantity" id="quantity" placeholder="1">
 </div>
 <div class="amount i-item">
   <input  name="amount" id="amount" placeholder="0.00">
 </div>
 <div class="tax i-item">
   <input type="checkbox" name="tax" id="tbtax" value="checked">
 </div>
 <br>`;
    container.appendChild(div); 
})
function calcSubTotal(rate,quantity)
{
  return rate*quantity;
}

function updateTotal()
{
  let _amount=document.querySelectorAll('#amount');
  let _subtotalAmount=0;
  subTotal.textContent=_subtotalAmount;
  
    for(i=0;i<_amount.length;i++)
    {
      _subtotalAmount+=parseFloat(_amount[i].value);
      
    }
    subTotal.textContent=Math.ceil(_subtotalAmount);
    gst.textContent=Math.ceil(_subtotalAmount*0.05);
    total.textContent=Math.ceil(_subtotalAmount+_subtotalAmount*0.05);
    balanceDue.textContent=total.textContent;
}
invoiceItemsContainer.addEventListener('keyup',function(e)
{
  if(e.target.id=='rate' || e.target.id=='quantity')
  {
    let parent=e.target.parentElement.parentElement;
    let rate =parent.querySelector('#rate').value;
    let quantity=parent.querySelector('#quantity').value;
    let amount =parent.querySelector('#amount');
    console.log('amount is',amount);
    amount.value=rate*quantity;
    
  }
updateTotal();

})
invoiceItemsContainer.addEventListener('click',function(e)
{
  let parent=e.target.parentElement.parentElement;
  if(e.target.id=='trash')
  {
   
    
    parent.parentNode.removeChild(parent);
  }
  else if(e.target.id=='tbtax')
  {
    let rate =parent.querySelector('#rate').value;
    let quantity=parent.querySelector('#quantity').value;
    let amount=parent.querySelector('#amount');
    let tax=0.02;
      price=rate*quantity;
    if(e.target.checked)
    {
      
      taxAmount=price*tax;
      amount.value=parseFloat(price)+price*tax;
    }
    else
    {
     amount.value=rate*quantity;
    }
    
  }
  updateTotal();
 
})
btnGeneratePDf.addEventListener('click',function(e)
        {
          let productDescription=document.querySelectorAll('#item-description');
          let productRate=document.querySelectorAll('#rate');
          let productQuantity=document.querySelectorAll('#quantity');
          let productAmount=document.querySelectorAll('#amount');

          let companyDetails=document.querySelectorAll('.from-container >input');
          let customerDetails=document.querySelectorAll('.to-container >input');
          let paymentTerm=document.querySelector('#terms');
          let element=   document.createElement('div');
          // element.setAttribute('class','check');
          let header=document.createElement('div');
          header.setAttribute('class','header');
          header.innerHTML=`<span><label id="lbl-dataTime" >${new Date()}</label></span>
          <span> <label id="lbl-invoice-details" >Preview Invoice- ${companyDetails[5].value} -${companyDetails[0].value}</label></span>`;
          element.appendChild(header);
         let hr1=document.createElement('hr');
         hr1.setAttribute('id','header-break')
         element.appendChild(hr1);

         
          let firstContainer=document.createElement('div');
          firstContainer.setAttribute('class','first-container');
          firstContainer.innerHTML=`<div class="companyLogo">
          <img src="${uploadedImage}" alt="companylogo">
          
          </div>
  
         <div class="companyDetails">
         <label id="lbl-companyName" ><h2>${companyDetails[0].value}</h2></label><br>
         <label id="lbl-companyAddress">${companyDetails[2].value}</label><br>
         <label id="lbl-companyCity">NTN-${companyDetails[4].value}</label><br>
         <label id="lbl-companyPhone">${companyDetails[3].value}</label><br>
         <label id="lbl-Email">${companyDetails[1].value}</label>
        </div>
        <div class="invoiceDetails">
        <h6>INVOICE NUMBER</h6>
        <label id="lbl-invoiceNo">${companyDetails[5].value}</label>
        <h6>DATE</h6>
         <label id="lbl-invoiceDate">${document.querySelector('#orderDate').value}</label>
         <h6>DUE</h6>
        <label id="lbl-invoiceDue"> ${paymentTerm.options[paymentTerm.selectedIndex].text}</label>
        <h6>BALANCE DUE</h6>
        <label id="lbl-invoiceDue">${balanceDue.textContent}</label>
       </div>`;
       element.appendChild(firstContainer);
       let hr2=document.createElement('hr');
         hr2.setAttribute('id','section-break');
         element.appendChild(hr2);
      
       let secondContainer=document.createElement('div');
       secondContainer.setAttribute('class','second-container');
       secondContainer.innerHTML=`   <div class="customerDetails">
       <label  ><h2>Bill To</h2></label>
       <label id="lbl-customerName" ><h3>${customerDetails[0].value}</h3></label>
       <label id="lbl-customerEmail">${customerDetails[1].value}</label><br>
       <label id="lbl-customerAddress">${customerDetails[2].value}</label><br>
       <label id="lbl-customerPhone">${customerDetails[3].value}</label><br>
      
   </div>`;
       element.appendChild(secondContainer);
       let thirdContainer=document.createElement('div');
       thirdContainer.setAttribute('class','third-container');
       let table =document.createElement('table');
       table.innerHTML=` <tr><th>Description</th>
                   <th>Rate</th>
                   <th>Quantity</th>
                   <th>Amount</th></tr> ` ;
        for(i=0;i<productAmount.length;i++)
        {
          table.innerHTML+= `<tr><td>${productDescription[i].value}</td>
          <td>${productRate[i].value}</td>
          <td>${productQuantity[i].value}</td>
          <td>${productAmount[i].value}</td></tr>  `;
        }
        thirdContainer.appendChild(table);
        element.appendChild(thirdContainer);
        element.appendChild(hr2);

        let forthContainer=document.createElement('div');
      forthContainer.setAttribute('class','fourth-container');
  
       forthContainer.innerHTML=`  <div class="values">
       <label> ${subTotal.textContent}</label><br>
       <label> ${Math.ceil(parseFloat(subTotal.textContent)*0.05)}</label><br>
       <label> ${Math.ceil(parseFloat(subTotal.textContent)+parseFloat(subTotal.textContent)*0.05)}</label><br>
       <hr>
       <label> ${balanceDue.textContent}</label><br>
       <hr>   </div>
       <div class="labels">
       <strong><label> SUBTOTAL</label></strong> <br>
         <strong><label> GST</label></strong><br>
         <strong><label> TOTAL</label></strong><br>
        <hr>
         <strong><label> BALANCE DUE</label></strong><br>
        <hr>
    </div>
   `;

    element.appendChild(forthContainer);

       

            html2pdf(element,{
                // margin:1,
                margin: [0.2, 0.2],
                filename:'sample.pdf',
                html2canvas:{scale:0},
                jsPDF:{ unit: 'in', format: 'letter', orientation: 'landscape' }
            });
            // html2pdf().from(element).toPdf().get('pdf').then(function (pdf) {
            //   pdf.addPage();
            // }).toPdf().save();

            
        })


