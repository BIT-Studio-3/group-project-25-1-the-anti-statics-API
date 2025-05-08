// import * as chaiModule from "chai";
// import chaiHttp from "chai-http";
// import { describe, it } from "mocha";

// import app from "../app.js";

// const chai = chaiModule.use(chaiHttp);

// let resourcesId;

// describe("ResourcesAvailability", () => {
//     it("should reject non-string name", async () => {
//         const res = await chai
//             .request(app)
//             .post("/api/v1/ResourcesAvailability")
//             .send({
//                 name: 123,
//                 contactInfo: "Fire", 
//                 assistance: "MetService rescue team"
//             });

//         chai.expect(res.body.message).to.be.equal("Name should be a string");
//     });

//     it("should create a valid rescource", async () => {
//         const res = await chai.request(app).post("/api/v1/ResourcesAvailability").send({
//             name: "MetService",
//             contactInfo: "Fire",
//             assistance: "MetService rescue team",
//         });

//         chai
//             .expect(res.body.message)
//             .to.be.equal("Resource successfully created");
//         resourcesId = res.body.data[0].id;
//     });

//     it("should retrieve all ResourcesAvailability", async () => {
//         const res = await chai.request(app).get("/api/v1/ResourcesAvailability");

//         chai.expect(res.body.data).to.be.an("array");
//     });

//     it("should retrieve a resource by ID", async () => {
//         const res = await chai
//             .request(app)
//             .get(`/api/v1/ResourcesAvailability/${resourcesId}`);

//         chai.expect(res.body.data.name).to.be.equal("MetService");
//     });

//     it("should filter ResourcesAvailability by name", async () => {
//         const res = await chai.request(app).get("/api/v1/ResourcesAvailability?name=MetService");

//         chai.expect(res.body.data[0].name).to.be.equal("MetService");
//     });

//     it("should reject non-string assistance during update", async () => {
//         const res = await chai
//             .request(app)
//             .put(`/api/v1/ResourcesAvailability/${resourcesId}`)
//             .send({
//                 name: "MetService",
//                 contactInfo: "Fire",
//                 assistance: 72369840,
//             });

//         chai.expect(res.body.message).to.be.equal("Assistance should be a string");
//     });

//     it("should update a valid rescource", async () => {
//         const res = await chai
//             .request(app)
//             .put(`/api/v1/ResourcesAvailability/${resourcesId}`)
//             .send({
//                 name: "MetService",
//                 contactInfo: "Fire",
//                 assistance: "MetService rescue team",
//             });

//         chai
//             .expect(res.body.message)
//             .to.be.equal(
//                 `Resource with the id: ${resourcesId} successfully updated`
//             );
//     });

//     it("should delete a rescource by ID", async () => {
//         const res = await chai
//             .request(app)
//             .delete(`/api/v1/ResourcesAvailability/${resourcesId}`);

//         chai
//             .expect(res.body.message)
//             .to.be.equal(
//                 `Resource with the id: ${resourcesId} successfully deleted`
//             );
//     });
// });