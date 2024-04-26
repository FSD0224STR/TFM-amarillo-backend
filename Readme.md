# BACKEND

## DB Collections

### User

> | name            | type     | data type | description                                                        |
> | --------------- | -------- | --------- | ------------------------------------------------------------------ |
> | email           | required | string    | User e-mail                                                        |
> | password        | required | string    | User password                                                      |
> | profileType     | required | enum      | HR or real user                                                    |
> | profilePic      | optional | img       | User profile pic                                                   |
> | phoneExt        | optional | number    | User phone ext                                                     |
> | dni             | required | string    | User DNI (required if real user)                                   |
> | position        | required | string    | User position (required if real user)                              |
> | departmentId    | required | ObjectId  | User department id (required if real user)                         |
> | bankAccount     | required | string    | User bank account (required if real user)                          |
> | fullName        | required | string    | User Full name (required if real user)                             |
> | studies         | required | string    | User studies (required if real user)                               |
> | birthDate       | required | Date      | User birth date (required if real user)                            |
> | address         | optional | string    | User address (required if real user)                               |
> | phoneNumber     | required | number    | User phone number (required if real user)                          |
> | personalMail    | optional | string    | User personal mail (required if real user)                         |
> | status          | required | enum      | User status (required if real user): (Sick leave, working, former) |
> | removedAt       | required | enum      | Removal date for soft-delete                                       |

### Department

> | name            | type      | data type | description                  |
> | --------------- | --------- | --------- | ---------------------------- |
> | departmentName  | required  | string    | N/A                          |
> | removedAt       | optional  | enum      | Removal date for soft-delete |


### Goals

> | name             | type      | data type | description                  |
> | ---------------- | --------- | --------- | ---------------------------- |
> | goalDescription  | required  | string    | N/A                          |
> | employeeId       | required  | ObjectId  | N/A                          |
> | removedAt        | optional  | enum      | Removal date for soft-delete |


### Goal tasks

> | name             | type      | data type | description                  |
> | ---------------- | --------- | --------- | ---------------------------- |
> | goalId           | required  | ObjectId  | N/A                          |
> | taskDescription  | required  | string    | N/A                          | 
> | taskStatus       | required  | enum      | Done /Not done               |
> | removedAt        | required  | enum      | Removal date for soft-delete |

### Absence period

> | name             | type      | data type | description                  |
> | ---------------- | --------- | --------- | -----------                  |
> | employeeId       | required  | ObjectId  | N/A                          |
> | startDate        | required  | date      | Done /Not done               |
> | endDate          | required  | date      | Done /Not done               |
> | country          | required  | enum      | Done /Not done               |
> | absenceReason    | required  | enum      | Done /Not done               |
> | removedAt        | required  | enum      | Removal date for soft-delete |

### Spends

> | name             | type      | data type | description                  |
> | ----             | ----      | --------- | ---------------------------- |
> | employeeId       | required  | ObjectId  | N/A                          |
> | travelId         | required  | ObjectId  | N/A                          |
> | date             | required  | date      | Done /Not done               |
> | paymentMethod    | required  | enum      | Done /Not done               |
> | creditCardEnd    | required  | enum      | Done /Not done               |
> | spendType        | required  | enum      | Done /Not done               |

## Endpoints

### Users

<details>
  <summary>
    <code>GET</code> 
    <code>/employees</code> 
    Get users list where user is an actual employee
  </summary>
  
  #### Parameters

> | name | type | data type | description |
> | ---- | ---- | --------- | ----------- |
> | None | N/A  | N/A       | N/A         |

#### Responses

> | http code | content-type       | response              |
> | --------- | ------------------ | --------------------- |
> | `200`     | `application/json` | Array of employees    |

</details>

<details>
  <summary>
    <code>GET</code> 
    <code>/employees/:id</code> 
    Get detail of an user
  </summary>
  
  #### Parameters

> | name | type     | data type | description    |
> | ---- | -------- | --------- | -------------- |
> | id   | required | string    | ID of the user |

#### Responses

> | http code | content-type       | response                  |
> | --------- | ------------------ | ------------------------- |
> | `200`     | `application/json` | An user object            |
> | `403`     | `application/json` | `{"msg":"Forbidden}`      |
> | `404`     | `application/json` | `{"msg":"Task not found}` |

</details>

<details>
  <summary>
    <code>PUT</code> 
    <code>/employees/:id</code> 
    Update an employee
  </summary>
  
  #### Parameters

> | name            | type     | data type | description                                                        |
> | --------------- | -------- | --------- | ------------------------------------------------------------------ |
> | profilePic      | optional | img       | User profile pic                                                   |
> | dni             | required | string    | User DNI (required if real user)                                   |
> | bankAccount     | required | string    | User bank account (required if real user)                          |
> | fullName        | required | string    | User Full name (required if real user)                             |
> | studies         | required | string    | User studies (required if real user)                               |
> | birthDate       | required | Date      | User birth date (required if real user)                            |
> | address         | optional | string    | User address (required if real user)                               |
> | phoneNumber     | required | number    | User phone number (required if real user)                          |
> | personalMail    | optional | string    | User personal mail (required if real user)                         |

#### Responses

> | http code | content-type       | response                                                            |
> | --------- | ------------------ | ------------------------------------------------------------------- |
> | `200`     | `application/json` | `{ msg: "User updated" }`                                           |
> | `400`     | `application/json` | `{"msg": "You missed some parameters: parameter1, parameter2, ...}` |
> | `403`     | `application/json` | `{"msg": "Forbidden"}  `                                            |
> | `404`     | `application/json` | `{"msg": "Task not found"}`                                         |

</details>

<details>
  <summary>
    <code>POST</code> 
    <code>/tasks/</code> 
    Create a new employee
  </summary>
  
  #### Parameters

> | name            | type     | data type | description                                                        |
> | --------------- | -------- | --------- | ------------------------------------------------------------------ |
> | email           | required | string    | User e-mail                                                        |
> | password        | required | string    | User password                                                      |
> | profilePic      | optional | img       | User profile pic                                                   |
> | phoneExt        | optional | number    | User phone ext                                                     |
> | dni             | required | string    | User DNI (required if real user)                                   |
> | bankAccount     | required | string    | User bank account (required if real user)                          |
> | fullName        | required | string    | User Full name (required if real user)                             |
> | studies         | required | string    | User studies (required if real user)                               |
> | birthDate       | required | Date      | User birth date (required if real user)                            |
> | address         | optional | string    | User address (required if real user)                               |
> | phoneNumber     | required | number    | User phone number (required if real user)                          |
> | personalMail    | optional | string    | User personal mail (required if real user)                         |

#### Responses

> | http code | content-type       | response                                                            |
> | --------- | ------------------ | ------------------------------------------------------------------- |
> | `201`     | `application/json` | `{"msg": "User created", "id": "123456}`                            |
> | `400`     | `application/json` | `{"msg": "You missed some parameters: parameter1, parameter2, ...}` |

</details>

<details>
  <summary>
    <code>DELETE</code> 
    <code>/employees/:id</code> 
    Delete user
  </summary>
  
  #### Parameters

> | name | type | data type | description |
> | ---- | ---- | --------- | ----------- |
> | None | N/A  | N/A       | N/A         |

#### Responses

> | http code | content-type       | response                  |
> | --------- | ------------------ | ------------------------- |
> | `200`     | `application/json` | An user object            |
> | `403`     | `application/json` | `{"msg":"Forbidden}`      |
> | `404`     | `application/json` | `{"msg":"User not found}` |

</details>

<details>
  <summary>
    <code>GET</code> 
    <code>/perfil</code> 
    Get detail of the current user
  </summary>
  
  #### Parameters

> | name | type | data type | description |
> | ---- | ---- | --------- | ----------- |
> | None | N/A  | N/A       | N/A         |

#### Responses

> | http code | content-type       | response                  |
> | --------- | ------------------ | ------------------------- |
> | `200`     | `application/json` | An user object            |
> | `403`     | `application/json` | `{"msg":"Forbidden}`      |
> | `404`     | `application/json` | `{"msg":"Task not found}` |

</details>

### Department

<details>
  <summary>
    <code>GET</code> 
    <code>/departments</code> 
    
  </summary>
  
  #### Parameters

> | name | type | data type | description |
> | ---- | ---- | --------- | ----------- |
> | None | N/A  | N/A       | N/A         |

#### Responses

> | http code | content-type       | response              |
> | --------- | ------------------ | --------------------- |
> | `200`     | `application/json` | Array of departments    |

</details>

<details>
  <summary>
    <code>PUT</code> 
    <code>/departments/:id</code> 
    Update a department
  </summary>
  
  #### Parameters

> | name            | type     | data type | description  |
> | --------------- | -------- | --------- | ------------ |
> | departmentName  | required | string    | N/A          |


#### Responses

> | http code | content-type       | response                                                            |
> | --------- | ------------------ | ------------------------------------------------------------------- |
> | `200`     | `application/json` | `{ msg: "User updated" }`                                           |
> | `400`     | `application/json` | `{"msg": "You missed some parameters: parameter1, parameter2, ...}` |
> | `403`     | `application/json` | `{"msg": "Forbidden"}  `                                            |
> | `404`     | `application/json` | `{"msg": "Task not found"}`                                         |

</details>

<details>
  <summary>
    <code>POST</code> 
    <code>/departments</code> 
    Create a department
  </summary>
  
  #### Parameters

> | name            | type     | data type | description  |
> | --------------- | -------- | --------- | ------------ |
> | departmentName  | required | string    | N/A          |


#### Responses

> | http code | content-type       | response                                                            |
> | --------- | ------------------ | ------------------------------------------------------------------- |
> | `200`     | `application/json` | `{ msg: "Department created" }`                                     |
> | `400`     | `application/json` | `{"msg": "You missed some parameters: parameter1, parameter2, ...}` |
> | `403`     | `application/json` | `{"msg": "Forbidden"}  `                                            |
> | `404`     | `application/json` | `{"msg": "Task not found"}`                                         |

</details>

<details>
  <summary>
    <code>DELETE</code> 
    <code>/departments/:id</code> 
    Delete department
  </summary>
  
  #### Parameters

> | name | type | data type | description |
> | ---- | ---- | --------- | ----------- |
> | None | N/A  | N/A       | N/A         |

#### Responses

> | http code | content-type       | response                  |
> | --------- | ------------------ | ------------------------- |
> | `200`     | `application/json` | An user object            |
> | `403`     | `application/json` | `{"msg":"Forbidden}`      |
> | `404`     | `application/json` | `{"msg":"User not found}` |

</details>

### Goals

<details>
  <summary>
    <code>GET</code> 
    <code>/departments</code> 
    
  </summary>
  
  #### Parameters

> | name | type | data type | description |
> | ---- | ---- | --------- | ----------- |
> | None | N/A  | N/A       | N/A         |

#### Responses

> | http code | content-type       | response              |
> | --------- | ------------------ | --------------------- |
> | `200`     | `application/json` | Array of departments    |

</details>

<details>
  <summary>
    <code>PUT</code> 
    <code>/departments/:id</code> 
    Update a department
  </summary>
  
  #### Parameters

> | name            | type     | data type | description  |
> | --------------- | -------- | --------- | ------------ |
> | departmentName  | required | string    | N/A          |


#### Responses

> | http code | content-type       | response                                                            |
> | --------- | ------------------ | ------------------------------------------------------------------- |
> | `200`     | `application/json` | `{ msg: "User updated" }`                                           |
> | `400`     | `application/json` | `{"msg": "You missed some parameters: parameter1, parameter2, ...}` |
> | `403`     | `application/json` | `{"msg": "Forbidden"}  `                                            |
> | `404`     | `application/json` | `{"msg": "Task not found"}`                                         |

</details>

<details>
  <summary>
    <code>POST</code> 
    <code>/departments</code> 
    Create a department
  </summary>
  
  #### Parameters

> | name            | type     | data type | description  |
> | --------------- | -------- | --------- | ------------ |
> | departmentName  | required | string    | N/A          |


#### Responses

> | http code | content-type       | response                                                            |
> | --------- | ------------------ | ------------------------------------------------------------------- |
> | `200`     | `application/json` | `{ msg: "Department created" }`                                     |
> | `400`     | `application/json` | `{"msg": "You missed some parameters: parameter1, parameter2, ...}` |
> | `403`     | `application/json` | `{"msg": "Forbidden"}  `                                            |
> | `404`     | `application/json` | `{"msg": "Task not found"}`                                         |

</details>

<details>
  <summary>
    <code>DELETE</code> 
    <code>/departments/:id</code> 
    Delete department
  </summary>
  
  #### Parameters

> | name | type | data type | description |
> | ---- | ---- | --------- | ----------- |
> | None | N/A  | N/A       | N/A         |

#### Responses

> | http code | content-type       | response                  |
> | --------- | ------------------ | ------------------------- |
> | `200`     | `application/json` | An user object            |
> | `403`     | `application/json` | `{"msg":"Forbidden}`      |
> | `404`     | `application/json` | `{"msg":"User not found}` |

</details>

### Goal tasks

<details>
  <summary>
    <code>GET</code> 
    <code>/departments</code> 
    
  </summary>
  
  #### Parameters

> | name | type | data type | description |
> | ---- | ---- | --------- | ----------- |
> | None | N/A  | N/A       | N/A         |

#### Responses

> | http code | content-type       | response              |
> | --------- | ------------------ | --------------------- |
> | `200`     | `application/json` | Array of departments    |

</details>

<details>
  <summary>
    <code>PUT</code> 
    <code>/departments/:id</code> 
    Update a department
  </summary>
  
  #### Parameters

> | name            | type     | data type | description  |
> | --------------- | -------- | --------- | ------------ |
> | departmentName  | required | string    | N/A          |


#### Responses

> | http code | content-type       | response                                                            |
> | --------- | ------------------ | ------------------------------------------------------------------- |
> | `200`     | `application/json` | `{ msg: "User updated" }`                                           |
> | `400`     | `application/json` | `{"msg": "You missed some parameters: parameter1, parameter2, ...}` |
> | `403`     | `application/json` | `{"msg": "Forbidden"}  `                                            |
> | `404`     | `application/json` | `{"msg": "Task not found"}`                                         |

</details>

<details>
  <summary>
    <code>POST</code> 
    <code>/departments</code> 
    Create a department
  </summary>
  
  #### Parameters

> | name            | type     | data type | description  |
> | --------------- | -------- | --------- | ------------ |
> | departmentName  | required | string    | N/A          |


#### Responses

> | http code | content-type       | response                                                            |
> | --------- | ------------------ | ------------------------------------------------------------------- |
> | `200`     | `application/json` | `{ msg: "Department created" }`                                     |
> | `400`     | `application/json` | `{"msg": "You missed some parameters: parameter1, parameter2, ...}` |
> | `403`     | `application/json` | `{"msg": "Forbidden"}  `                                            |
> | `404`     | `application/json` | `{"msg": "Task not found"}`                                         |

</details>

<details>
  <summary>
    <code>DELETE</code> 
    <code>/departments/:id</code> 
    Delete department
  </summary>
  
  #### Parameters

> | name | type | data type | description |
> | ---- | ---- | --------- | ----------- |
> | None | N/A  | N/A       | N/A         |

#### Responses

> | http code | content-type       | response                  |
> | --------- | ------------------ | ------------------------- |
> | `200`     | `application/json` | An user object            |
> | `403`     | `application/json` | `{"msg":"Forbidden}`      |
> | `404`     | `application/json` | `{"msg":"User not found}` |

</details>

<details>
  <summary>
    <code>PATCH</code> 
    <code>/tasks/:id</code> 
    Mark task as done
  </summary>
  
  #### Parameters

> | name | type     | data type | description    |
> | ---- | -------- | --------- | -------------- |
> | id   | required | string    | ID of the task |

#### Responses

> | http code | content-type       | response                               |
> | --------- | ------------------ | -------------------------------------- |
> | `200`     | `application/json` | `{"msg": "Task marked as completed"}`  |
> | `403`     | `application/json` | `{"msg": "Forbidden"}  `               |
> | `404`     | `application/json` | `{"msg": "Task not found"}`            |
> | `400`     | `application/json` | `{"msg": "You missed parameter 'id'"}` |

</details>

### Absence

