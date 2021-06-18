db.Bookmarks.find({
  "$and": [
    {
      "_p_bookmark": {
        "$eq": "Post$B1GwwFUbHJ"
      }
    },
    {
      "_rperm": {
        "$in": [
          null,
          "*"
        ]
      }
    }
  ]
}).explain("executionStats");
db.Bookmarks.find().count();