import React from 'react';
import {AbsoluteFill, Audio, Composition, Sequence, staticFile, useCurrentFrame, useVideoConfig, interpolate, Easing} from 'remotion';

const P={bg:'#080611',pink:'#ff4fd8',violet:'#8b5cf6',blue:'#4f7dff',cyan:'#54f1e5',white:'#f8f6ff',muted:'#aaa5c0'};
const scenes=[
 {title:'ТВОЙ MINECRAFT.',sub:'ТВОИ ПРАВИЛА.',tag:'RED SHIFT',kind:'hero'},
 {title:'ВЫБИРАЙ ВЕРСИЮ',sub:'От классики до новых приключений.',tag:'VERSION MANAGER',kind:'versions'},
 {title:'СОБИРАЙ СВОЙ СТИЛЬ',sub:'Моды, профили и настройки под твой геймплей.',tag:'CUSTOM SETUP',kind:'mods'},
 {title:'БОЛЬШЕ КОНТРОЛЯ',sub:'Настрой запуск под свой компьютер.',tag:'YOUR SETTINGS',kind:'settings'},
 {title:'МЕНЬШЕ РУТИНЫ.',sub:'БОЛЬШЕ ВРЕМЕНИ В ИГРЕ.',tag:'READY TO PLAY',kind:'play'},
 {title:'REDSHIFT LAUNCHER',sub:'Скачивай. Настраивай. Играй.',tag:'ТВОЙ MINECRAFT НАЧИНАЕТСЯ ЗДЕСЬ',kind:'end'}
];
const Glow=({x,y,size,color}:{x:number;y:number;size:number;color:string})=><div style={{position:'absolute',left:x,top:y,width:size,height:size,borderRadius:'50%',background:color,filter:'blur(100px)',opacity:.25}}/>;
const Logo=()=> <div style={{display:'flex',alignItems:'center',gap:14}}><div style={{width:58,height:58,borderRadius:18,display:'grid',placeItems:'center',fontSize:34,fontWeight:1000,color:'#fff',background:'linear-gradient(135deg,#ff4fd8,#8b5cf6 58%,#4f7dff)',boxShadow:'0 0 35px #a34fff88'}}>R</div><div style={{fontSize:27,fontWeight:900,letterSpacing:3}}>REDSHIFT<span style={{color:P.pink}}>.</span></div></div>;
const Mock=({kind,frame}:{kind:string;frame:number})=><div style={{position:'absolute',left:760,top:210+Math.sin(frame/13)*7,width:690,height:420,borderRadius:22,background:'#100d1d',border:'1px solid #ffffff24',boxShadow:'0 35px 100px #000a,0 0 60px #8b5cf633',overflow:'hidden'}}>
 <div style={{height:46,display:'flex',alignItems:'center',padding:'0 20px',gap:8,background:'#1b1630',borderBottom:'1px solid #ffffff14'}}><i style={{width:9,height:9,borderRadius:9,background:'#ff6a8b'}}/><i style={{width:9,height:9,borderRadius:9,background:'#ffc76a'}}/><i style={{width:9,height:9,borderRadius:9,background:'#62e7b5'}}/><span style={{marginLeft:14,color:'#b9b2ce',fontSize:13,letterSpacing:2}}>REDSHIFT LAUNCHER</span></div>
 <div style={{display:'flex',height:374}}><div style={{width:145,padding:18,background:'#0c0a16',display:'flex',flexDirection:'column',gap:18}}>{['Главная','Версии','Моды','Настройки'].map((v,i)=><div key={v} style={{padding:11,borderRadius:9,fontSize:14,color:(kind==='versions'?i===1:kind==='mods'?i===2:kind==='settings'?i===3:i===0)?'#fff':'#77718d',background:(kind==='versions'?i===1:kind==='mods'?i===2:kind==='settings'?i===3:i===0)?'#8b5cf633':'transparent',borderLeft:(kind==='versions'?i===1:kind==='mods'?i===2:kind==='settings'?i===3:i===0)?'3px solid #ff4fd8':'3px solid transparent'}}>{v}</div>)}</div>
 <div style={{flex:1,padding:25,position:'relative'}}><div style={{fontSize:23,fontWeight:800,marginBottom:7}}>{kind==='versions'?'Выбери версию':kind==='mods'?'Твоя сборка':kind==='settings'?'Параметры запуска':'Добро пожаловать!'}</div><div style={{fontSize:13,color:P.muted,marginBottom:22}}>Настрой Minecraft под себя</div>
 {(kind==='versions'?['1.21.4  •  Fabric','1.20.1  •  Forge','1.16.5  •  Vanilla']:kind==='mods'?['Оптимизация','Мини-карта','Интерфейс']:kind==='settings'?['Выделенная память','Параметры Java','Папка Minecraft']:['ТВОЙ MINECRAFT','ГОТОВ К ЗАПУСКУ']).map((v,i)=><div key={v} style={{padding:14,marginBottom:9,borderRadius:11,background:i===0?'#8b5cf633':'#ffffff08',border:'1px solid '+(i===0?'#b47aff77':'#ffffff12'),color:P.white,fontSize:15}}>{v}<span style={{float:'right',color:P.cyan}}>{kind==='mods'?'ВКЛ':kind==='settings'?'Настроить →':'●'}</span></div>)}
 <div style={{position:'absolute',bottom:20,right:24,padding:'12px 32px',borderRadius:11,background:'linear-gradient(100deg,#ff4fd8,#8b5cf6)',fontWeight:900,color:'#fff'}}>ИГРАТЬ</div></div></div></div>;
const Scene=({s,i}:{s:typeof scenes[number];i:number})=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();const a=interpolate(f,[0,24],[0,1],{extrapolateRight:'clamp',easing:Easing.out(Easing.cubic)});
 const mock=['versions','mods','settings','play'].includes(s.kind);
 return <AbsoluteFill style={{background:P.bg,color:P.white,fontFamily:'Arial,sans-serif',overflow:'hidden'}}>
 <Glow x={-180+Math.sin(f/30)*20} y={-220} size={650} color={P.violet}/><Glow x={1120} y={380} size={620} color={P.pink}/>
 <div style={{position:'absolute',inset:0,opacity:.1,backgroundImage:'linear-gradient(#ffffff12 1px,transparent 1px),linear-gradient(90deg,#ffffff12 1px,transparent 1px)',backgroundSize:'58px 58px'}}/>
 <div style={{position:'absolute',left:85,top:58,opacity:a}}><Logo/></div>
 <div style={{position:'absolute',left:90,top:250,width:mock?650:1150,opacity:a,transform:`translateY(${(1-a)*35}px)`}}>
 <div style={{fontSize:17,fontWeight:800,letterSpacing:5,color:P.cyan,marginBottom:22}}>{s.tag}</div>
 <div style={{fontSize:s.kind==='end'?62:65,fontWeight:1000,lineHeight:1.08,letterSpacing:-2,textShadow:'0 5px 35px #0008'}}>{s.title}</div>
 <div style={{fontSize:27,lineHeight:1.45,color:'#c4bfd3',marginTop:24,maxWidth:630}}>{s.sub}</div>
 {s.kind==='hero'&&<div style={{marginTop:42,width:260,padding:'17px 25px',borderRadius:14,textAlign:'center',fontSize:18,fontWeight:900,letterSpacing:2,background:'linear-gradient(100deg,#ff4fd8,#8b5cf6)',boxShadow:'0 0 45px #b34fff66'}}>ЗАПУСКАЙ СВОЙ МИР</div>}
 {s.kind==='end'&&<div style={{marginTop:40,fontSize:22,color:P.cyan,letterSpacing:2}}>redshiftlauncher.netlify.app</div>}
 </div>
 {mock&&<Mock kind={s.kind==='play'?'hero':s.kind} frame={f}/>}
 {s.kind==='hero'&&<div style={{position:'absolute',right:120,bottom:85,width:380,height:380,borderRadius:'50%',border:'1px solid #ffffff22',boxShadow:'0 0 90px #8b5cf644',display:'grid',placeItems:'center',fontSize:190,fontWeight:1000,color:'#ffffff12',transform:`rotate(${f*.3}deg)`}}>R</div>}
 <div style={{position:'absolute',bottom:38,left:90,right:90,display:'flex',justifyContent:'space-between',color:'#77718d',fontSize:13,letterSpacing:3}}><span>REDSHIFT LAUNCHER</span><span>0{i+1} / 06</span></div>
 <div style={{position:'absolute',bottom:0,left:0,height:4,width:`${(f/(fps*7.5))*100}%`,background:'linear-gradient(90deg,#ff4fd8,#54f1e5)'}}/>
 </AbsoluteFill>
};
const Ad:React.FC=()=> <AbsoluteFill><Audio src={staticFile('voice.wav')} volume={1}/>{scenes.map((s,i)=><Sequence key={s.kind} from={i*450} durationInFrames={450}><Scene s={s} i={i}/></Sequence>)}</AbsoluteFill>;
export const Root:React.FC=()=> <Composition id="RedshiftAd" component={Ad} durationInFrames={2700} fps={60} width={1920} height={1080}/>;
