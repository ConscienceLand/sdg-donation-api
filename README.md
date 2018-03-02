## Open Endpoints

Open endpoints require no Authentication.

* signup : `POST /user/signup`

## Endpoints that require Authentication

Closed endpoints require a valid 'donation-code' to be included in the header of the
request.

### Current User related

* check user status : `GET /user/check`
* get donation address : `GET /address/:project/:currency`
* get users donations : `GET /deposits`
