import VueSelector from "testcafe-vue-selectors";

fixture("Navbar").page("http://localhost:8042/");

test("Navbar > Large screen have classic navbar", async t => {
	await t.resizeWindow(1280, 720);
	await t.expect(VueSelector("navbar").exists).ok();
});

test("MobileNavbar > Little screen have mobile navbar", async t => {
	await t.resizeWindow(480, 800);
	await t.expect(VueSelector("mobile-navbar").exists).ok();
});

test("MobileNavbar > Search work", async t => {
	await t.resizeWindow(480, 800);
	const mobileNavbar = VueSelector("mobile-navbar");
	await t
		.click(mobileNavbar.find(".toolbar__content > .btn"))
		.typeText(mobileNavbar.find(".toolbar__content input"), "Unicorn !")
		.expect(VueSelector("search-results").exists)
		.ok();
});
