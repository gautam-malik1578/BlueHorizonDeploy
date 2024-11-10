import styles from "./Author.module.css";
function Author() {
  return (
    <div className={styles.author}>
      <figure className={styles.fig1}>
        <img
          src="https://media.licdn.com/dms/image/v2/D4E03AQELS8mKQCsHUg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1714967077359?e=1736380800&v=beta&t=IIY429gIhc25Yg2V4VAGT8IB97zRtgDSahXagJnV0A4"
          alt="author pic"
        />
      </figure>
      <p className={styles.about}>
        Hello! ✋ I'm a passionate and self-motivated developer with a keen
        interest in building robust and interactive web applications. With the
        MERN stack as my core toolkit, I love exploring new features and best
        practices to create seamless, responsive, and efficient projects. Each
        step, from database management to front-end design, excites me as I
        continually look for ways to improve and expand my skillset. When I'm
        not working on my projects, you can usually find me tackling challenging
        problems on LeetCode. I enjoy the problem-solving aspect, as it sharpens
        my analytical abilities and allows me to think creatively.Thanks for
        stopping by, and I look forward to connecting with fellow enthusiasts!
        😁
      </p>
      <footer>
        <ol>
          <li>
            <a
              href="https://www.linkedin.com/in/gautam-malik1578"
              target="_blank"
              rel="noopener noreferrer"
            >
              <figure className={styles.fig2}>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRokEYt0yyh6uNDKL8uksVLlhZ35laKNQgZ9g&s"
                  alt="linkedin pic"
                />
              </figure>
            </a>
          </li>
          <li>
            <a
              href="https://github.com/gautam-malik1578"
              target="_blank"
              rel="noopener noreferrer"
            >
              <figure className={styles.fig2}>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5fTvBqEpyLmHNzZVx0YlKR5wOxFoLRAtZxA&s"
                  alt="github pic"
                />
              </figure>
            </a>
          </li>
          <li>
            <a
              href="https://leetcode.com/u/Gautam_malik1578/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <figure className={styles.fig2}>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVDk0914gTcacHBY8G7zjTX7C_NApHt9nilg&s"
                  alt="leetcode img"
                />
              </figure>
            </a>
          </li>
        </ol>
      </footer>
    </div>
  );
}

export default Author;
// vermagangadhar248@gmail.com
