document.addEventListener("DOMContentLoaded", function () {
  fetchDataFromStrapi();
});

function fetchDataFromStrapi() {
  //   const localApi = "http://localhost:1337/api";
  const productionApiUrl =
    "https://engineers-admin-0b4f437c3ec6.herokuapp.com/api";

  const fetchHero = fetch(`${productionApiUrl}/hero`).then((response) =>
    response.json()
  );
  const fetchServices = fetch(`${productionApiUrl}/services`).then((response) =>
    response.json()
  );
  const fetchNavigation = fetch(`${productionApiUrl}/navigations`).then(
    (response) => response.json()
  );

  Promise.all([fetchHero, fetchServices, fetchNavigation])
    .then((data) => {
      const [heroData, servicesData, navigationData] = data;
      this.updateNavigation(navigationData.data);
      this.updateHeroSection(heroData);
    })
    .catch((error) => {
      console.error("Failed to fetch data:", error);
    });
}

function updateNavigation(items) {
    const navigation = document.querySelector(".s-header__nav");
    navigation.innerHTML = "";
    items.forEach((item) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.textContent = item.navTitle;
      a.href = item.link;
      a.className = "smoothscroll";
      a.title = item.attributeTitle;
  
      a.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
  
      li.appendChild(a);
      navigation.appendChild(li);
    });
  }
  

function updateHeroSection(items) {
  const title = document.querySelector(".hero-title");
  const description = document.querySelector(".hero-description");

  title.innerHTML = "";
  description.innerHTML = "";

  title.textContent = items.data.heroTitle;
  description.innerHTML = items.data.heroDescription.replace(/\n/g, "<br>");
  description.textContent = items.data.heroDescription;
}
