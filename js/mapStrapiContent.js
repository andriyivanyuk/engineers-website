document.addEventListener("DOMContentLoaded", function () {
  fetchDataFromStrapi();
});

function fetchDataFromStrapi() {
  const apiUrl = "http://localhost:1337/api";

  const fetchHero = fetch(`${apiUrl}/hero`).then((response) => response.json());
  const fetchServices = fetch(`${apiUrl}/services`).then((response) =>
    response.json()
  );
  const fetchNavigation = fetch(`${apiUrl}/navigations`).then((response) =>
    response.json()
  );

  Promise.all([fetchHero, fetchServices, fetchNavigation])
    .then((data) => {
      const [heroData, servicesData, navigationData] = data;
      this.updateHeroSection(heroData);
      this.updateNavigation(navigationData.data);
    })
    .catch((error) => {
      console.error("Failed to fetch data:", error);
    });
}

//Method for controlling navigation
function updateNavigation(items) {
  const navigation = document.querySelector(".s-header__nav");
  navigation.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.textContent = item.navTitle;
    a.href = item.link;
    a.className = "smoothscroll";
    a.title = item.navTitle;

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
