document.addEventListener("DOMContentLoaded", () => {
   const dataList = document.getElementById("data-list");
   //
   const loadingSpinnner = document.getElementById("loading");

   // Input filfer
   const filterInput = document.getElementById("filter");
   // Get modal
   const modal = document.getElementById("myModal");
   // modal content
   const modalContent = document.querySelector(".modal-body");
   const closeModal = document.querySelector(".close");
   // cookies
   const setCookieBtn = document.getElementById("setCookieBtn");
   const cookieBanner = document.getElementById("cookieBanner");

   // theme change mode
   const themeBtnToggler = document.getElementById("theme-toggler");
   const themeIcon = themeBtnToggler.querySelector("i");

   const body = document.body;

   let usersData = [];

   fetch("https://randomuser.me/api?results=100")
      .then((response) => {
         return response.json();
      })
      .then((data) => {
         loadingSpinnner.classList.add("hidden");
         usersData = data.results;
         displayUsers(usersData);
      })
      .catch((error) => {
         loadingSpinnner.classList.add("hidden");
         console.log(`Error: ${error}`);
      });

   // display users
   const displayUsers = (users) => {
      dataList.innerHTML = ""; // clear list
      if (users.length) {
         users.forEach((user, index) => {
            const li = document.createElement("li");
            li.innerHTML = `<img src="${user.picture.medium}" alt="${user.name.first} ${user.name.last}" />
             <p class="name">${user.name.first} ${user.name.last}</p></p>
             <p >${user.email}</p>
             <button class="detail-btn" data-index="${index}">Show Details</button>
             `;
            dataList.appendChild(li);

            li.querySelector(".detail-btn").addEventListener("click", () => {
               //Call show modal function
               openModal(usersData[index]);
            });
         });
      }
   };

   // Filter users

   filterInput.addEventListener("input", (e) => {
      const value = e.target.value.toLowerCase();
      const filteredUsers = usersData.filter((user) => {
         return `${user.name.first} ${user.name.last}`
            .toLowerCase()
            .includes(value);
      });
      displayUsers(filteredUsers);
   });
   // open modal
   function openModal(user) {
      if (user) {
         modalContent.innerHTML = `
            <p><strong>${user.name.first} ${user.name.last}</strong></p>
            <p><strong>Gender:</strong> ${user.gender}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Age:</strong> ${user.dob.age}</p>
            <p><strong>Location:</strong> ${user.location.city}, ${user.location.country}</p>
            <img src="${user.picture.large}" alt="${user.name.first} ${user.name.last}">
            `;
         modal.style.display = "block";
      }
   }

   closeModal.addEventListener("click", () => {
      modal.style.display = "none";
   });

   window.addEventListener("click", (event) => {
      if (event.target == modal) {
         modal.style.display = "none";
      }
   });

   themeBtnToggler.addEventListener("click", () => {
      body.classList.toggle("dark-mode"); // Toggle dark mode  class
      if (body.classList.contains("dark-mode")) {
         themeIcon.classList.remove("fa-sun");
         themeIcon.classList.add("fa-moon");
         localStorage.setItem("theme", "dark");
      } else {
         themeIcon.classList.remove("fa-moon");
         themeIcon.classList.add("fa-sun");
         localStorage.setItem("theme", "light");
      }
   });
   // Check cookies
   function checkCookie() {
      if (localStorage.getItem("cookieConsent") === "true") {
         cookieBanner.classList.add("hidden");
      } else {
         cookieBanner.classList.remove("hidden");
      }
   }
   // set cookies
   setCookieBtn.addEventListener("click", () => {
      localStorage.setItem("cookieConsent", true);
      cookieBanner.classList.add("hidden");
   });
   window.onload = checkCookie;
});
