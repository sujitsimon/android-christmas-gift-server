
# android-christmas-gift-server


Express Server for Android Christmas Gifts Project




## Installation

To Clone the Server Contents

```bash
  git clone https://github.com/sujitsimon/android-christmas-gift-server.git
```

```bash
  cd android-christmas-gift-server
  npm install
```


## API Reference

#### Get User Details

```http
  GET /getUserDetails
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token_number` | `string` | **Required**. Token Number |

**Returns:** User Details

```json
{
    "_id": Hash,
    "Token_Number": Number,
    "Collected_Person": "zzz",
    "Name": "xxx",
    "Hint": "yyy",
    "Prize_Number": Number,
    "Prize_Collected": Boolean,
    "Prize_Selected": Boolean
}
```



#### Update Prize Details

```http
  POST /updatePrizeDetails
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token_number` | `string` | **Required**. Token Number |
| `update`      | `json` | **Required**. Update Required in JSON |


**Returns:** Acknowledged Status

```json
{
    "acknowledged": true,
    "modifiedCount": 1,
    "upsertedId": null,
    "upsertedCount": 0,
    "matchedCount": 1
}
```


#### Get Prize Details

```http
  GET /getPrizeDetails
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `prize_number` | `string` | **Required**. Prize Number |


**Returns:** Acknowledged Status

```json
{
    "_id": Hash,
    "Prize_No": Number,
    "Prize_Name": "xxx"
}
```

#### Get Token Processed Details

```http
  GET /isTokenAlreadyProcessed
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token_number` | `string` | **Required**. Token Number |

**Returns:** `Boolean`

#### Get Total Token

```http
  GET /getTotalTokens
```
**Returns:** Total Token `Number`

#### Get Incomplete Token

```http
  GET /getInCompleteTokens
```
**Returns:** Incomplete Token `Number`

#### Get Total Prize Delivered

```http
  GET /prizeDelivered
```
**Returns:** Prizes Delivered `Number`

#### Get Total Prize Yet to Deliver

```http
  GET /prizeYetToDelivered
```
**Returns:** Prizes Yet to be Delivered  `Number`