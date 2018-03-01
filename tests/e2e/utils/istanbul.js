import { ClientFunction } from "testcafe";
import { Collector, Report } from "istanbul";
import exitHook from "exit-hook";

const getCoverage = ClientFunction(() => window.__coverage__);
const collector = new Collector();

exitHook(() => {
	Report.create("html").writeReport(collector, true);
	Report.create("text").writeReport(collector, true);
});

export default async function(t) {
	collector.add(await getCoverage());
}
