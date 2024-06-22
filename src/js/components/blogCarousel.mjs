export function createBlogCarousel() {
    const section = document.createElement('section');
    section.classList.add('blog-carousel');
    section.setAttribute('id', 'blog-carousel');
  
    section.innerHTML = `
      <h2>From Our Blog</h2>
      <div class="blog-carousel-wrap">
        <a href="/src/html/pages/blog/blog-post-1.html">
          <div class="blog-card">
            <img
              alt="A girl is sitting in front of a computer in a room with plushies and a neon sign that reads 'the coziest games to play this fall'."
              class="blog-image"
              src="/assets/images/blog/cozy.png"
            />
            <h3 class="blog-post-title">The coziest games to play this winter</h3>
          </div>
        </a>
        <a href="/src/html/pages/blog/blog-post-2.html">
          <div class="blog-card">
            <img
              alt="Neon colors and various gaming consoles under text that reads 'what type of gamer are you?'"
              class="blog-image"
              src="/assets/images/blog/quiz.png"
            />
            <h3 class="blog-post-title">QUIZ: What type of gamer are you?</h3>
          </div>
        </a>
        <a href="/src/html/pages/games/games.html">
          <div class="blog-card">
            <img
              alt="Text reading 'hot new releases this week' surrounded by gaming consoles, video game covers and fire."
              class="blog-image"
              src="/assets/images/blog/hot.png"
            />
            <h3 class="blog-post-title">HOT new releases this week</h3>
          </div>
        </a>
      </div>
      <a href="/src/html/pages/blog/blog.html" class="button button--blog">read blog</a>
    `;
  
    return section;
  }