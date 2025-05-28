const menuDrawer = document.getElementById("menuDrawer");
const menuDrawerToggleShow = document.getElementById("menuDrawerToggleShow");
const menuDrawerToggleKeep = document.getElementById("menuDrawerToggleKeep");
const footDrawer = document.getElementById("footDrawer");
const footDrawerToggleShow = document.getElementById("footDrawerToggleShow");
const mainBackdrop = document.getElementById("mainBackdrop");

let drawerNavShow = false;
let drawerFooterShow = false;
let drawerNavPinned = false;

function closeAllDrawers() {
  if (!drawerNavPinned) menuDrawer.classList.remove("open");
  footDrawer.classList.remove("open");
  mainBackdrop.classList.remove("active");
}

menuDrawerToggleShow.addEventListener("click", () => {
  // Jeśli footer jest otwarty – zamknij go
  if (drawerFooterShow) {
    drawerFooterShow = false;
    footDrawer.classList.remove('open');
    mainBackdrop.classList.remove('active');
  }

  if (drawerNavPinned) return;

  drawerNavShow = !drawerNavShow;

  const isOpen = menuDrawer.classList.toggle("open");
  mainBackdrop.classList.toggle("active", isOpen);
});

menuDrawerToggleKeep.addEventListener("click", () => {
  // Jeśli footer jest otwarty – zamknij go
  if (drawerFooterShow) {
    drawerFooterShow = false;
    footDrawer.classList.remove('open');
    mainBackdrop.classList.remove('active');
  }

  drawerNavPinned = !drawerNavPinned;

  if (drawerNavPinned) {
    menuDrawer.classList.add("pinned");
    menuDrawer.classList.remove("open");
    document.body.classList.remove("body-ground-with-drawer-hide");
    document.body.classList.add("body-ground-with-drawer-show");
    mainBackdrop.classList.remove("active");

    menuDrawerToggleShow.style.display = "none";
  } else {
    menuDrawer.classList.remove("pinned");
    document.body.classList.remove("body-ground-with-drawer-show");
    document.body.classList.add("body-ground-with-drawer-hide");
    
    menuDrawerToggleShow.style.display = "";
  }
});

footDrawerToggleShow.addEventListener("click", () => {
   // Jeśli przypięty, odpinamy i chowamy
  if (drawerNavPinned) {
    drawerNavPinned = false;
    menuDrawer.classList.remove('pinned');
    menuDrawer.classList.remove('open');
    document.body.classList.remove('body-ground-with-drawer-show');
    document.body.classList.add('body-ground-with-drawer-hide');
    menuDrawerToggleShow.style.display = ''; // przywrócenie widoczności przycisku menuDrawerToggleShow
  }

  drawerFooterShow = !drawerFooterShow;
  const isOpen = footDrawer.classList.toggle('open');
  mainBackdrop.classList.toggle('active', isOpen);
});

mainBackdrop.addEventListener("click", () => {
  closeAllDrawers();
});
