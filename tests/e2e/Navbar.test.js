import { ClientFunction } from "testcafe";
import VueSelector from "testcafe-vue-selectors";

fixture("Navbar").page("http://localhost:8042/");

const navbar = VueSelector("navbar");
const mobileNavbar = VueSelector("mobile-navbar");
const app = VueSelector("v-app");
const getWindowLocation = ClientFunction(() => window.location);

test("Navbar > Large screen have classic navbar", async t => {
	await t.resizeWindow(1280, 720);
	await t.expect(navbar.exists).eql(true);
});

test("Navbar > Dark Theme input toogle Theme", async t => {
	await t.resizeWindow(1280, 720);
	const themeSwitch = navbar.find(".switch label").withText("Dark");
	await t
		.expect(app.hasClass("theme--light"))
		.eql(true)
		.expect(app.hasClass("theme--dark"))
		.eql(false);
	await t.click(themeSwitch);
	await t
		.expect(app.hasClass("theme--light"))
		.eql(false)
		.expect(app.hasClass("theme--dark"))
		.eql(true);
	await t.click(themeSwitch);
	await t
		.expect(app.hasClass("theme--light"))
		.eql(true)
		.expect(app.hasClass("theme--dark"))
		.eql(false);
});

test("Navbar > Language Switch change lang", async t => {
	await t.resizeWindow(1280, 720);
	const languageSelect = VueSelector("language-select");
	await t.expect(languageSelect.find("span").textContent).eql("en");
	await t
		.expect(navbar.find(".list__tile__content").withText("Index").exists)
		.eql(true);
	await t.click(languageSelect);
	await t.click(app.find(".list__tile__title").withText("fr"));
	await t.expect(languageSelect.find("span").textContent).eql("fr");
	await t
		.expect(navbar.find(".list__tile__content").withText("Accueil").exists)
		.eql(true);
});

test("Navbar > Button toogle navbar", async t => {
	await t.resizeWindow(1280, 720);
	const navigationDrawer = VueSelector("v-navigation-drawer");
	await t.expect(navigationDrawer.getVue(({ props }) => props.value)).eql(true);
	await t.click(navbar.find(".nav-content .btn"));
	await t
		.expect(navigationDrawer.getVue(({ props }) => props.value))
		.eql(false);
	await t.click(app.find(".el-float.btn"));
	await t.expect(navigationDrawer.getVue(({ props }) => props.value)).eql(true);
});

test("Navbar > Navigation links", async t => {
	await t.resizeWindow(1280, 720);
	await t.click(navbar.find(".list__tile__content").withText("Search"));
	await t
		.expect((await getWindowLocation()).href)
		.eql("http://localhost:8042/search");
});

test("MobileNavbar > Little screen have mobile navbar", async t => {
	await t.resizeWindow(480, 800);
	await t.expect(mobileNavbar.exists).eql(true);
});

test("MobileNavbar > Search", async t => {
	await t.resizeWindow(480, 800);
	await t
		.click(mobileNavbar.find(".toolbar__content > .btn"))
		.typeText(mobileNavbar.find(".toolbar__content input"), "Unicorn !")
		.expect(VueSelector("search-results").exists)
		.eql(true);
});

test("MobileNavbar > Navigation links", async t => {
	await t.resizeWindow(480, 800);
	await t.click(mobileNavbar.find(".btn span").withText("Search"));
	await t
		.expect((await getWindowLocation()).href)
		.eql("http://localhost:8042/search");
});

test("MobileNavbar > SignIn", async t => {
	await t.resizeWindow(480, 800);
	await t.click(mobileNavbar.find(".toolbar .icon").withText("account_circle"));
	await t
		.expect((await getWindowLocation()).href)
		.eql("http://localhost:8042/auth/login");
});
