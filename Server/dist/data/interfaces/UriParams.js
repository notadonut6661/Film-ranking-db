"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UriParams = void 0;
exports.UriParams = {
    Film: {
        GET: [{ name: "id", type: "number" }],
        POST: [
            { name: "id", type: "number" },
            { name: "title", type: "string" },
            { name: "description", type: "string" },
            { name: "rating", type: "number" },
            { name: "cast", type: [
                    { name: "actorId", type: "number" }, { name: "role", type: "string" }
                ] },
            { name: "rating_quantity", type: "number" }
        ],
        PATCH: [{ name: "id", type: "number" }],
        DELETE: [{ name: "id", type: "number" }]
    }
};
