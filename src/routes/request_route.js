var mongoose = require('ypbackendlib').mongoose,
    Model = mongoose.model('Request'),
    generic = require('ypbackendlib').handlers;

module.exports = function (swagger) {

    var baseUrl = '/requests',
        baseUrlWithId = baseUrl + '/{id}';

    swagger.addOperation({
        spec: {
            description: "Operations about requests",
            path: baseUrlWithId,
            notes: "returns a request based on id",
            summary: "find request by id",
            method: "GET",
            params: [swagger.pathParam("id", "ID of the request to be fetched", "string"),
                generic.params.populate],
            "responseClass": "Request",
            "errorResponses": [swagger.errors.invalid('id'), swagger.errors.notFound("user")],
            "nickname": "getRequestById",
            accessLevel: 'al_individual'
        },
        action: generic.getByIdFn(baseUrl, Model)
    });

    swagger.addOperation({
        spec: {
            description: "Operations about requests",
            path: baseUrl,
            notes: "returns all requests, but limits to 100 entries by default, is not owner-constrained, e.g. it returns requests" +
                "from several users. Use query params sort:'created:-1' and limit to retrieve the newest requests",
            summary: "get all requests",
            method: "GET",
            params: [generic.params.sort,
                generic.params.limit,
                generic.params.filter,
                generic.params.populate,
                generic.params.populatedeep,
                swagger.queryParam('owned', 'include requests owned by this user',
                    'Boolean', false, false)
            ],
            "responseClass": "Array[Request]",
            "nickname": "getRequests",
            accessLevel: 'al_individual'
        },
        action: generic.getAllFn(baseUrl, Model)
    });

    swagger.addOperation({
        spec: {
            description: "Operations about requests",
            path: baseUrl,
            notes: "POSTs a new request",
            summary: "POSTs a new request",
            method: "POST",
            params: [swagger.bodyParam("Request", "new Request object", "Request")],
            "responseClass": "Request",
            "nickname": "postRequests",
            accessLevel: 'al_individual'
        },
        action:  generic.postFn(baseUrl, Model)
        }
    );

    swagger.addOperation({
        spec: {
            description: "Operations about requests",
            path: baseUrlWithId,
            notes: "update an existing request",
            summary: "Update an request",
            method: "PUT",
            "responseClass": "Request",
            "nickname": "putRequest",
            params: [swagger.pathParam("id", "ID of the request to be updated", "string"), swagger.bodyParam("request", "request to be updated", "Request")],
            accessLevel: 'al_user',
            beforeCallbacks: []
        },
        action: generic.putFn(baseUrl, Model)
    });
    
    swagger.addOperation({
            spec: {
                description: "Operations about requests",
                path: baseUrlWithId,
                notes: "delete request",
                summary: "Deletes a request by id",
                method: "DELETE",
                params: [swagger.pathParam("id", "ID of the request to be fetched", "string")],
                "nickname": "deleteRequest",
                accessLevel: 'al_user'
            },
            action:  generic.deleteByIdFn(baseUrl, Model)
        }
    );

    swagger.addOperation({
            spec: {
                description: "Operations about requests",
                path: baseUrl,
                notes: "delete all requests",
                summary: "Deletes requests",
                method: "DELETE",
                "nickname": "deleteRequests",
                accessLevel: 'al_admin'
            },
            action:  generic.deleteAllFn(baseUrl, Model)
        }
    );

};