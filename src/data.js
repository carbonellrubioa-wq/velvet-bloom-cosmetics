export const currency = (n) => new Intl.NumberFormat('es-CO', {style:'currency',currency:'COP',maximumFractionDigits:0}).format(Number(n)||0);
export const integer = (n) => new Intl.NumberFormat('es-CO').format(Math.round(Number(n)||0));
export const todayMonth = () => new Date().toISOString().slice(0,7);
export const dateLocal = (offset=0) => {const d=new Date();d.setDate(d.getDate()+offset);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;};
export const seedProducts = [
{id:1,name:'Velvet Matte Lipstick',category:'Labios',price:28000,cost:12000,stock:90,sold:0,tag:'BEST SELLER',image:'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=900&auto=format&fit=crop',description:'Color irresistible, acabado mate de larga duración.'},
{id:2,name:'Bloom Skin Foundation',category:'Rostro',price:48000,cost:25000,stock:70,sold:0,tag:'FAVORITO',image:'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=900&auto=format&fit=crop',description:'Cobertura ligera para una piel luminosa.'},
{id:3,name:'Rose Petal Blush',category:'Rostro',price:32000,cost:14000,stock:75,sold:0,tag:'NUEVO',image:'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=900&auto=format&fit=crop',description:'Rubor delicado para un toque rosado natural.'},
{id:4,name:'Lash Bloom Mascara',category:'Ojos',price:25000,cost:10000,stock:85,sold:0,tag:'',image:'https://images.pexels.com/photos/3373728/pexels-photo-3373728.jpeg?auto=compress&dpr=1&h=750&w=1260',description:'Volumen y definición desde la primera pasada.'},
{id:5,name:'Silk Compact Powder',category:'Rostro',price:38000,cost:18000,stock:55,sold:0,tag:'',image:'https://images.pexels.com/photos/1499517/pexels-photo-1499517.jpeg?auto=compress&dpr=1&h=750&w=1260',description:'Acabado aterciopelado y sin brillos.'},
{id:6,name:'Crystal Shine Gloss',category:'Labios',price:22000,cost:9000,stock:110,sold:0,tag:'DESTACADO',image:'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=900&auto=format&fit=crop',description:'Brillo luminoso con una textura confortable.'}
];
export const seedExpenses = [
{id:1,name:'Salario colaboradora 1',category:'Nómina',amount:1500000},
{id:2,name:'Salario colaboradora 2',category:'Nómina',amount:1500000},
{id:3,name:'Arriendo del local',category:'Instalaciones',amount:850000},
{id:4,name:'Servicios públicos',category:'Servicios',amount:240000},
{id:5,name:'Publicidad digital',category:'Marketing',amount:380000},
{id:6,name:'Internet y otros',category:'Otros',amount:130000}
];
const s=(id,quantity)=>({productId:id,quantity,unitPrice:seedProducts.find(p=>p.id===id).price,unitCost:seedProducts.find(p=>p.id===id).cost,name:seedProducts.find(p=>p.id===id).name});
export const seedOrders=[
{id:'VB-1001',date:dateLocal(-12),customer:'Pedido demostración 01',items:[s(1,28),s(2,18),s(3,21),s(4,12)],status:'Confirmado'},
{id:'VB-1002',date:dateLocal(-8),customer:'Pedido demostración 02',items:[s(1,22),s(5,13),s(6,19)],status:'Confirmado'},
{id:'VB-1003',date:dateLocal(-3),customer:'Pedido demostración 03',items:[s(2,14),s(3,17),s(4,16),s(6,11)],status:'Confirmado'}
];
export const orderTotal=o=>o.items.reduce((a,i)=>a+i.unitPrice*i.quantity,0);
export const orderCost=o=>o.items.reduce((a,i)=>a+i.unitCost*i.quantity,0);
export const getMetrics=(products,orders,expenses,month)=>{
 const current=orders.filter(o=>o.status==='Confirmado' && o.date.slice(0,7)===month);
 const revenue=current.reduce((a,o)=>a+orderTotal(o),0);
 const cogs=current.reduce((a,o)=>a+orderCost(o),0);
 const fixed=expenses.reduce((a,e)=>a+Number(e.amount),0);
 const units=current.reduce((a,o)=>a+o.items.reduce((b,i)=>b+i.quantity,0),0);
 const contribution=revenue-cogs;
 const ratio=revenue>0?contribution/revenue:0;
 const perProduct=products.map(p=>{
  const lines=current.flatMap(o=>o.items).filter(i=>i.productId===p.id);
  const qty=lines.reduce((a,i)=>a+i.quantity,0);
  const income=lines.reduce((a,i)=>a+i.quantity*i.unitPrice,0);
  const costs=lines.reduce((a,i)=>a+i.quantity*i.unitCost,0);
  return {...p,qty,income,costs,margin:income-costs,share:units?qty/units*100:0};
 });
 return {revenue,cogs,fixed,units,contribution,ratio,net:contribution-fixed,breakEven:ratio>0?fixed/ratio:null,orderCount:current.length,perProduct,current};
};
export const initialState=()=>({products:seedProducts.map(p=>({...p,stock:p.stock - seedOrders.flatMap(o=>o.items).filter(i=>i.productId===p.id).reduce((a,i)=>a+i.quantity,0)})),orders:seedOrders,expenses:seedExpenses});
