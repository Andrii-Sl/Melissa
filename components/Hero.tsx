export default function Hero() {
  return (
    <section style={{padding:"80px 40px"}}>
      <h1 style={{fontSize:"56px",marginBottom:"20px"}}>
        Подбор автозапчастей из Европы
      </h1>

      <p style={{fontSize:"20px",color:"#666",marginBottom:"30px"}}>
        VIN подбор, оригинальные детали, доставка по Европе.
      </p>

      <input
        placeholder="Введите VIN"
        style={{
          width:"100%",
          maxWidth:"500px",
          padding:"18px",
          border:"1px solid #ddd",
          borderRadius:"12px"
        }}
      />
    </section>
  );
}
