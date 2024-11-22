import styles from "./Roadmap.module.css";

export default function Roadmap() {
  const roadmapItems = [
    {
      title: "Decentralized exchange",
      info: "Vigor decentralized exchange will have significant differences also there will be several revenue generating schemes will be implemented in different ways.",
    },
    {
      title: "Crypto lottery",
      info: "By guessing the numbers correctly, you can win the prize 12 times a day, ranging from $1,000 to  $100,000.",
    },
    {
      title: "Vigor native token ",
      info: "Vigor token will use in all vigor projects as a fee and will be built on the basis of the vigor token with the participation of foreign partners in the AI infrastructure online games and Metaverse.",
    },
    {
      title: "Explorer",
      info: "Vigor's proprietary explorer has the ability to track all cryptocurrency transactions",
    },
  ];

  return (
    <section className="mt-10">
      <div className={"text-center mx-2 -mb-8"}>
        <span className={"text-3xl font-bold"}>Vigor Roadmap</span>
      </div>

      <div className={"flex justify-center"}>
        <div className={styles.timeline}>
          {roadmapItems.map((item, index) => {
            return (
              <div key={index} className={styles.card}>
                <div className={styles.info}>
                  <h3 className={styles.title}>{item.title}</h3>
                  <p>{item.info}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
