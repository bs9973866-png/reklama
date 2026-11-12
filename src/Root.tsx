import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, useVideoConfig, interpolate, Easing} from 'remotion';

const C = {
  bg:'#080611', panel:'#151126', pink:'#ff4fd8', violet:'#8b5cf6',
  blue:'#4f7dff', cyan:'#54f1e5', white:'#f8f6ff', muted:'#aaa5c0'
};

const scenes = [
  {title:'ТВОЙ MINECRAFT.', sub:'ТВОИ ПРАВИЛА.', tag:'RED SHIFT', kind:'hero'},
  {title:'ВЫБИРАЙ ВЕРСИЮ', sub:'От классики до новых приключений.', tag:'VERSION MANAGER', kind:'versions'},
  {title:'СОБИРАЙ СВОЙ СТИЛЬ', sub:'Профили, моды и настройки — под твой геймплей.', tag:'CUSTOM SETUP', kind:'mods'},
  {title:'БОЛЬШЕ КОНТРОЛЯ', sub:'Настрой запуск и параметры под свой компьютер.', tag:'YOUR SETTINGS', kind:'settings'},
  {title:'МЕНЬШЕ РУТИНЫ.', sub:'БОЛЬШЕ ВРЕМЕНИ В ИГРЕ.', tag:'READY TO PLAY', kind:'play'},
  {title:'REDShift Launcher', sub:'Скачивай. Настраивай. Играй.', tag:'ТВОЙ MINECRAFT НАЧИНАЕТСЯ ЗДЕСЬ', kind:'end'}
];

const narrations = [
  'Minecraft — это не просто игра. Это твой мир. И запускать его должно быть так же удобно, как играть.',
  'RedShift Launcher помогает выбрать нужную версию Minecraft и держать игровые профили под контролем.',
  'Хочешь другой геймплей? Настраивай сборку, подбирай моды и создавай собственный игровой опыт.',
  'Настрой параметры запуска под себя. Никакой лишней суеты перед тем, как зайти в игру.',
  'Открыл лаунчер, выбрал профиль — и можно отправляться навстречу новым приключениям.',
  'RedShift Launcher. Скачивай и попробуй. Твой Minecraft начинается здесь.'
];

const Glow = ({x,y,size,color,opacity=0.35}:{x:number;y:number;size:number;color:string;opacity?:number}) =>
  <div style={{position:'absolute',left:x,top:y,width:size,height:size,borderRadius:'50%',background:color,filter:'blur(90px)',opacity,pointerEvents:'none'}}/>;

const Logo = ({scale=1}:{scale?:number}) => (
  <div style={{display:'flex',alignItems:'center',gap:14, transform:`scale(${scale})`,transformOrigin:'left center'}}>
    <div style={{width:58,height:58,borderRadius:18,display:'grid',placeItems:'center',fontSize:34,fontWeight:1000,color:'#fff',background:`linear-gradient(135deg,${C.pink},${C.violet} 58%,${C.blue})`,boxShadow:'0 0 35px #a34fff88'}}>R</div>
    <div style={{fontSize:27,fontWeight:900,letterSpacing:3,color:C.white}}>REDSHIFT<span style={{color:C.pink}}>.</span></div>
  </div>
);

const MockWindow = ({kind,frame}:{kind:string;frame:number}) => {
  const bob = Math.sin(frame/13)*7;
  return <div style={{position:'absolute',left:750,top:205+ bob,width:720,height:440,borderRadius:24,background:'#100d1d',border:'1px solid #ffffff24',boxShadow:'0 35px 100px #000a,0 0 60px #8b5cf633',overflow:'hidden'}}>
    <div style={{height:48,display:'flex',alignItems:'center',padding:'0 20px',gap:8,background:'#1b1630',borderBottom:'1px solid #ffffff14'}}>
      <i style={{width:9,height:9,borderRadius:9,background:'#ff6a8b'}}/><i style={{width:9,height:9,borderRadius:9,background:'#ffc76a'}}/><i style={{width:9,height:9,borderRadius:9,background:'#62e7b5'}}/>
      <span style={{marginLeft:14,color:'#b9b2ce',fontSize:13,letterSpacing:2}}>REDSHIFT LAUNCHER</span>
    </div>
    <div style={{display:'flex',height:392}}>
      <div style={{width:150,padding:18,background:'#0c0a16',display:'flex',flexDirection:'column',gap:18}}>
        {['Главная','Версии','Моды','Настройки'].map((v,i)=><div key={v} style={{padding:'11px 10px',borderRadius:9,fontSize:14,color:(kind==='versions'?i===1:kind==='mods'?i===2:kind==='settings'?i===3:i===0)?'#fff':'#77718d',background:(kind==='versions'?i===1:kind==='mods'?i===2:kind==='settings'?i===3:i===0)?'#8b5cf633':'transparent',borderLeft:(kind==='versions'?i===1:kind==='mods'?i===2:kind==='settings'?i===3:i===0)?'3px solid #ff4fd8':'3px solid transparent'}}>{v}</div>)}
      </div>
      <div style={{flex:1,padding:26,position:'relative'}}>
        <div style={{fontSize:23,fontWeight:800,color:C.white,marginBottom:7}}>{kind==='versions'?'Выбери версию':kind==='mods'?'Твоя сборка':kind==='settings'?'Параметры запуска':'Добро пожаловать!'}</div>
        <div style={{fontSize:13,color:C.muted,marginBottom:24}}>Настрой Minecraft под себя</div>
        {kind==='versions'?['1.21.4  •  Fabric','1.20.1  •  Forge','1.16.5  •  Vanilla'].map((v,i)=><div key={v} style={{padding:15,marginBottom:10,borderRadius:12,background:i===0?'#8b5cf633':'#ffffff08',border:'1px solid '+(i===0?'#b47aff77':'#ffffff12'),color:C.white,fontSize:15}}>{v}<span style={{float:'right',color:C.cyan}}>●</span></div>):kind==='mods'?['Оптимизация','Мини-карта','Интерфейс'].map((v,i)=><div key={v} style={{padding:15,marginBottom:10,borderRadius:12,background:'#ffffff08',color:C.white,fontSize:15}}>{v}<span style={{float:'right',color:C.cyan}}>ВКЛ</span></div>):kind==='settings'?['Выделенная память','Параметры Java','Папка Minecraft'].map((v,i)=><div key={v} style={{padding:15,marginBottom:10,borderRadius:12,background:'#ffffff08',color:C.white,fontSize:15}}>{v}<span style={{float:'right',color:'#bda8ff'}}>Настроить →</span></div>):<div style={{height:160,borderRadius:16,background:'linear-gradient(120deg,#20153b,#121024)',display:'grid',placeItems:'center',fontSize:30,fontWeight:900,color:'#fff'}}>MINECRAFT <span style={{color:C.pink}}>READY</span></div>}
        <div style={{position:'absolute',bottom:22,right:25,padding:'13px 34px',borderRadius:12,background:`linear-gradient(100deg,${C.pink},${C.violet})`,fontWeight:900,color:'#fff',letterSpacing:1}}>ИГРАТЬ</div>
      </div>
    </div>
  </div>;
};

const Scene = ({item,index}:{item:typeof scenes[number];index:number}) => {
  const frame=useCurrentFrame(); const {fps}=useVideoConfig();
  const enter=interpolate(frame,[0,18],[0,1],{extrapolateRight:'clamp',easing:Easing.out(Easing.cubic)});
  const drift=Math.sin(frame/28)*12;
  const hasMock=['versions','mods','settings','play'].includes(item.kind);
  return <AbsoluteFill style={{background:C.bg,color:C.white,fontFamily:'Arial, sans-serif',overflow:'hidden'}}>
    <Glow x={-160+drift} y={-220} size={650} color={C.violet} opacity={0.25}/>
    <Glow x={1050-drift} y={370} size={650} color={C.pink} opacity={0.19}/>
    <div style={{position:'absolute',inset:0,opacity:.12,backgroundImage:'linear-gradient(#ffffff12 1px,transparent 1px),linear-gradient(90deg,#ffffff12 1px,transparent 1px)',backgroundSize:'58px 58px',maskImage:'linear-gradient(to bottom,black,transparent)'}}/>
    <div style={{position:'absolute',left:85,top:58,opacity:enter}}><Logo/></div>
    <div style={{position:'absolute',left:90,top:250,width:hasMock?690:1100,opacity:enter,transform:`translateY(${(1-enter)*35}px)`}}>
      <div style={{fontSize:17,fontWeight:800,letterSpacing:5,color:C.cyan,marginBottom:22}}>{item.tag}</div>
      <div style={{fontSize:item.kind==='end'?68:66,fontWeight:1000,lineHeight:1.08,letterSpacing:-2,textShadow:'0 5px 35px #0008'}}>{item.title}</div>
      <div style={{fontSize:27,lineHeight:1.45,color:'#c4bfd3',marginTop:24,maxWidth:650}}>{item.sub}</div>
      {item.kind==='hero'&&<div style={{marginTop:45,width:260,padding:'17px 25px',borderRadius:14,textAlign:'center',fontSize:18,fontWeight:900,letterSpacing:2,background:`linear-gradient(100deg,${C.pink},${C.violet})`,boxShadow:'0 0 45px #b34fff66'}}>ЗАПУСКАЙ СВОЙ МИР</div>}
      {item.kind==='end'&&<div style={{marginTop:40,fontSize:22,color:C.cyan,letterSpacing:2}}>redshiftlauncher.netlify.app</div>}
    </div>
    {hasMock&&<MockWindow kind={item.kind==='play'?'hero':item.kind} frame={frame}/>}
    {item.kind==='hero'&&<div style={{position:'absolute',right:125,bottom:90,width:390,height:390,borderRadius:'50%',border:'1px solid #ffffff22',boxShadow:'0 0 90px #8b5cf644',display:'grid',placeItems:'center',fontSize:190,fontWeight:1000,color:'#ffffff12',transform:`rotate(${frame*.3}deg)`}}>R</div>}
    <div style={{position:'absolute',bottom:38,left:90,right:90,display:'flex',justifyContent:'space-between',color:'#77718d',fontSize:13,letterSpacing:3}}>
      <span>REDSHIFT LAUNCHER</span><span>0{index+1} / 06</span>
    </div>
    <div style={{position:'absolute',bottom:0,left:0,height:4,width:`${(frame/(fps*7.5))*100}%`,background:`linear-gradient(90deg,${C.pink},${C.cyan})`}}/>
  </AbsoluteFill>;
};

export const Root:React.FC=()=> <></>;
export const Ad:React.FC=()=>{
  const {fps}=useVideoConfig();
  return <AbsoluteFill>
    {scenes.map((s,i)=><Sequence key={s.kind} from={i*fps*7.5} durationInFrames={fps*7.5}><Scene item={s} index={i}/></Sequence>)}
    <Audio src={staticFile('voice.mp3')} volume={1}/>
  </AbsoluteFill>;
};
export const RootComp:React.FC=()=> <Ad/>;
export const RootWithConfig = Root;
