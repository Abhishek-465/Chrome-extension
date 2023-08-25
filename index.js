let myLeads=[]

const inputEl=document.getElementById("input-el")
const inputbtn=document.getElementById("btn-el")
const ulEl=document.getElementById("ul-el")
const deleteEl=document.getElementById("delete-el")
const leadsfromlocal=JSON.parse(localStorage.getItem("myLeads"))
const tabBtn=document.getElementById("tab-el")
if(leadsfromlocal){
  myLeads=leadsfromlocal
  renderleads(myLeads)
}

inputbtn.addEventListener("click",function(){
    myLeads.push(inputEl.value)
    inputEl.value=""
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    renderleads(myLeads)

})

deleteEl.addEventListener("dblclick",function(){
  myLeads=[]
  localStorage.clear()
  renderleads(myLeads)
})

tabBtn.addEventListener("click",function(){
  chrome.tabs.query({active:true,currentWindow:true},function(tabs){
    let activeTab=tabs[0]
    let activeTabId=activeTab.id
    myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    renderleads(myLeads)
  })
  
})

function renderleads(Leads){
    let listitems=""
    for(let i=0;i<Leads.length;i++){
      listitems+=`
      <li> 
      <a  target='_blank' href='${Leads[i]}'>
       ${Leads[i]}
       </a>
      </li>`
    }
    ulEl.innerHTML=listitems
}