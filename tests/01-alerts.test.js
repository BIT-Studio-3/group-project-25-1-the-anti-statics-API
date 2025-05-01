import * as chaiModule from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";

import app from "../app.js";

const chai = chaiModule.use(chaiHttp);

let alertId;

describe("Alerts", () => {
    it("should reject non-string title", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1/alerts")
            .send({ title: 123, emergencyType: "Fire", alertLevel: 2, region: "Otago", description: "Building caught on fire" });

        chai.expect(res.body.message).to.be.equal("title should be a string");
    });

    it("should create a valid alert", async () => {
        const res = await chai.request(app).post("/api/v1/alerts").send({
            title: "Building Fire",
            emergencyType: "Fire",
            alertLevel: 2,
            region: "Otago",
            description: "Building caught on fire as there was a candle left by the curtain",
        });

        chai
            .expect(res.body.message)
            .to.be.equal("Alert successfully created");
            alertId = res.body.data[0].id;
    });

    it("should retrieve all alerts", async () => {
        const res = await chai.request(app).get("/api/v1/alerts");

        chai.expect(res.body.data).to.be.an("array");
    });

    it("should retrieve an alert by ID", async () => {
        const res = await chai
            .request(app)
            .get(`/api/v1/alerts/${alertId}`);

        chai.expect(res.body.data.title).to.be.equal("Building Fire");
    });

    it("should filter alerts by emergencyType", async () => {
        const res = await chai.request(app).get("/api/v1/alerts?emergencyType=Fire");

        chai.expect(res.body.data[0].emergencyType).to.be.equal("Fire");
    });

    it("should reject non-string region during update", async () => {
        const res = await chai
            .request(app)
            .put(`/api/v1/alerts/${alertId}`)
            .send({
                title: "Building Fire",
                emergencyType: "Fire",
                alertLevel: 2,
                region: 123,
                description: "Building caught on fire as there was a candle left by the curtain",
            });

        chai.expect(res.body.message).to.be.equal("region should be a string");
    });

    it("should update a valid alert", async () => {
        const res = await chai
            .request(app)
            .put(`/api/v1/alerts/${alertId}`)
            .send({
                title: "Building Fire",
                emergencyType: "Fire",
                alertLevel: 2,
                region: "Otago",
                description: "Building caught on fire as there was a hot iron left on the bed",
            });

        chai
            .expect(res.body.message)
            .to.be.equal(
                `Alert with the id: ${alertId} successfully updated`
            );
    });

    it("should delete an alert by ID", async () => {
        const res = await chai
            .request(app)
            .delete(`/api/v1/alerts/${alertId}`);

        chai
            .expect(res.body.message)
            .to.be.equal(
                `alert with the id: ${alertId} successfully deleted`
            );
    });
});