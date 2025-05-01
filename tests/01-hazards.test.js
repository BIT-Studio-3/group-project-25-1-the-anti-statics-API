import * as chaiModule from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";

import app from "../app.js";

const chai = chaiModule.use(chaiHttp);

let hazardId;

describe("Hazards", () => {
    it("should reject non-string name", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1/hazards")
            .send({ name: 123, type: "Fire", level: 2, city: "Dunedin", location: "Otago", description: "Building caught on fire" });

        chai.expect(res.body.message).to.be.equal("name should be a string");
    });

    it("should create a valid hazard", async () => {
        const res = await chai.request(app).post("/api/v1/hazards").send({
            name: "Building Fire",
            type: "Fire",
            level: 2,
            city: "Dunedin", 
            location: "Otago",
            description: "Building caught on fire as there was a candle left by the curtain",
        });

        chai
            .expect(res.body.message)
            .to.be.equal("Hazard successfully created");
            hazardId = res.body.data[0].id;
    });

    it("should retrieve all hazards", async () => {
        const res = await chai.request(app).get("/api/v1/hazards");

        chai.expect(res.body.data).to.be.an("array");
    });

    it("should retrieve an hazard by ID", async () => {
        const res = await chai
            .request(app)
            .get(`/api/v1/hazards/${hazardId}`);

        chai.expect(res.body.data.name).to.be.equal("Building Fire");
    });

    it("should filter hazards by type", async () => {
        const res = await chai.request(app).get("/api/v1/hazards?type=Fire");

        chai.expect(res.body.data[0].type).to.be.equal("Fire");
    });

    it("should reject non-string location during update", async () => {
        const res = await chai
            .request(app)
            .put(`/api/v1/hazards/${hazardId}`)
            .send({
                name: "Building Fire",
                type: "Fire",
                level: 2,
                city: "Dunedin", 
                location: 123,
                description: "Building caught on fire as there was a candle left by the curtain",
            });

        chai.expect(res.body.message).to.be.equal("location should be a string");
    });

    it("should update a valid hazard", async () => {
        const res = await chai
            .request(app)
            .put(`/api/v1/hazards/${hazardId}`)
            .send({
                name: "Building Fire",
                type: "Fire",
                level: 2,
                city: "Dunedin", 
                location: "Otago",
                description: "Building caught on fire as there was a hot iron left on the bed",
            });

        chai
            .expect(res.body.message)
            .to.be.equal(
                `Hazard with the id: ${hazardId} successfully updated`
            );
    });

    it("should delete an hazard by ID", async () => {
        const res = await chai
            .request(app)
            .delete(`/api/v1/hazards/${hazardId}`);

        chai
            .expect(res.body.message)
            .to.be.equal(
                `Hazard with the id: ${hazardId} successfully deleted`
            );
    });
});