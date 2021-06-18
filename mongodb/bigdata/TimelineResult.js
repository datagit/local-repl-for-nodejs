// 1. code naillie-api => API getMyNotificationsV3
// timelineQuery.explain(true).find()

// code the same
let availableStatus = [CONSTANT.TIMELINE.STATUS.UNREAD, CONSTANT.TIMELINE.STATUS.READ];
let timelineQuery = NailieTimeline.buildTimelineQueryByUserV2(request.user, mentionType);
timelineQuery.include(['user.avatar', 'post', 'content', 'booking']);
timelineQuery.select([
  'mentionType', 'follower', 'user.avatar', 'user.username', 'user.role', 'post.createdBy', 'post.thumbnail',
  'content.message', 'content.type', 'booking.bookingDate', 'booking.slot', 'booking.nailistId',
  'content.title', 'content.content', 'content.displaySetting', 'content.iconText', 'content.iconType','params',
  'salon.logoUrl', 'salon.salonName'
]);
timelineQuery.equalTo('isPushed', true);
timelineQuery.containedIn('status', availableStatus);
timelineQuery.notEqualTo('isPublic', false);
timelineQuery.notEqualTo('hidden', true);
timelineQuery.descending('createdAt');
timelineQuery.skip(params.offset);
timelineQuery.limit(params.limit);
timelineQuery.explain(true).find();
// raw query from mongo shell
ç
db.Timeline.find({
  "$and": [
      {
          "isPushed": {
              "$eq": true
          }
      },
      {
          "receiverId": {
              "$eq": "5CDBC3bEuY"
          }
      },
      {
          "mentionType": {
              "$in": [
                  "BOOKING",
                  "BOOKING_POINT_ADDED",
                  "BOOKING_POINT_RANK_REWARD",
                  "CARD_ERROR",
                  "CHANGE_BOOKING_DATE",
                  "LINKTO",
                  "NAILIST_CAN_NOT_CHANGE_DATE",
                  "NAILIST_EDIT_REPLY_REVIEW",
                  "NAILIST_REPLY_REVIEW",
                  "REVIEW",
                  "REVIEWED"
              ]
          }
      },
      {
          "status": {
              "$in": [
                  "READ",
                  "UNREAD"
              ]
          }
      },
      {
          "hidden": {
              "$not": {
                  "$eq": true
              }
          }
      },
      {
          "isPublic": {
              "$not": {
                  "$eq": false
              }
          }
      }
  ]
}).sort({createdAt: -1}).explain("executionStats");
// result from console log
{
  "queryPlanner": {
    "plannerVersion": 1,
    "namespace": "nailie-dev.Timeline",
    "indexFilterSet": false,
    "parsedQuery": {
      "$and": [
        {
          "isPushed": {
            "$eq": true
          }
        },
        {
          "receiverId": {
            "$eq": "5CDBC3bEuY"
          }
        },
        {
          "_rperm": {
            "$in": [
              null,
              "*"
            ]
          }
        },
        {
          "mentionType": {
            "$in": [
              "BOOKING",
              "BOOKING_POINT_ADDED",
              "BOOKING_POINT_RANK_REWARD",
              "CARD_ERROR",
              "CHANGE_BOOKING_DATE",
              "LINKTO",
              "NAILIST_CAN_NOT_CHANGE_DATE",
              "NAILIST_EDIT_REPLY_REVIEW",
              "NAILIST_REPLY_REVIEW",
              "REVIEW",
              "REVIEWED"
            ]
          }
        },
        {
          "status": {
            "$in": [
              "READ",
              "UNREAD"
            ]
          }
        },
        {
          "hidden": {
            "$not": {
              "$eq": true
            }
          }
        },
        {
          "isPublic": {
            "$not": {
              "$eq": false
            }
          }
        }
      ]
    },
    "winningPlan": {
      "stage": "PROJECTION_SIMPLE",
      "transformBy": {
        "mentionType": 1,
        "_p_follower": 1,
        "_p_user": 1,
        "_p_post": 1,
        "_p_content": 1,
        "_p_booking": 1,
        "params": 1,
        "_p_salon": 1,
        "_id": 1,
        "_created_at": 1,
        "_updated_at": 1,
        "_rperm": 1,
        "_wperm": 1
      },
      "inputStage": {
        "stage": "SORT",
        "sortPattern": {
          "_created_at": -1
        },
        "memLimit": 104857600,
        "limitAmount": 20,
        "type": "simple",
        "inputStage": {
          "stage": "COLLSCAN",
          "filter": {
            "$and": [
              {
                "isPushed": {
                  "$eq": true
                }
              },
              {
                "receiverId": {
                  "$eq": "5CDBC3bEuY"
                }
              },
              {
                "_rperm": {
                  "$in": [
                    null,
                    "*"
                  ]
                }
              },
              {
                "mentionType": {
                  "$in": [
                    "BOOKING",
                    "BOOKING_POINT_ADDED",
                    "BOOKING_POINT_RANK_REWARD",
                    "CARD_ERROR",
                    "CHANGE_BOOKING_DATE",
                    "LINKTO",
                    "NAILIST_CAN_NOT_CHANGE_DATE",
                    "NAILIST_EDIT_REPLY_REVIEW",
                    "NAILIST_REPLY_REVIEW",
                    "REVIEW",
                    "REVIEWED"
                  ]
                }
              },
              {
                "status": {
                  "$in": [
                    "READ",
                    "UNREAD"
                  ]
                }
              },
              {
                "hidden": {
                  "$not": {
                    "$eq": true
                  }
                }
              },
              {
                "isPublic": {
                  "$not": {
                    "$eq": false
                  }
                }
              }
            ]
          },
          "direction": "forward"
        }
      }
    },
    "rejectedPlans": []
  },
  "executionStats": {
    "executionSuccess": true,
    "nReturned": 20,
    "executionTimeMillis": 3989,
    "totalKeysExamined": 0,
    "totalDocsExamined": 4108674,
    "executionStages": {
      "stage": "PROJECTION_SIMPLE",
      "nReturned": 20,
      "executionTimeMillisEstimate": 110,
      "works": 4108697,
      "advanced": 20,
      "needTime": 4108676,
      "needYield": 0,
      "saveState": 4108,
      "restoreState": 4108,
      "isEOF": 1,
      "transformBy": {
        "mentionType": 1,
        "_p_follower": 1,
        "_p_user": 1,
        "_p_post": 1,
        "_p_content": 1,
        "_p_booking": 1,
        "params": 1,
        "_p_salon": 1,
        "_id": 1,
        "_created_at": 1,
        "_updated_at": 1,
        "_rperm": 1,
        "_wperm": 1
      },
      "inputStage": {
        "stage": "SORT",
        "nReturned": 20,
        "executionTimeMillisEstimate": 110,
        "works": 4108697,
        "advanced": 20,
        "needTime": 4108676,
        "needYield": 0,
        "saveState": 4108,
        "restoreState": 4108,
        "isEOF": 1,
        "sortPattern": {
          "_created_at": -1
        },
        "memLimit": 104857600,
        "limitAmount": 20,
        "type": "simple",
        "totalDataSizeSorted": 39866,
        "usedDisk": false,
        "inputStage": {
          "stage": "COLLSCAN",
          "filter": {
            "$and": [
              {
                "isPushed": {
                  "$eq": true
                }
              },
              {
                "receiverId": {
                  "$eq": "5CDBC3bEuY"
                }
              },
              {
                "_rperm": {
                  "$in": [
                    null,
                    "*"
                  ]
                }
              },
              {
                "mentionType": {
                  "$in": [
                    "BOOKING",
                    "BOOKING_POINT_ADDED",
                    "BOOKING_POINT_RANK_REWARD",
                    "CARD_ERROR",
                    "CHANGE_BOOKING_DATE",
                    "LINKTO",
                    "NAILIST_CAN_NOT_CHANGE_DATE",
                    "NAILIST_EDIT_REPLY_REVIEW",
                    "NAILIST_REPLY_REVIEW",
                    "REVIEW",
                    "REVIEWED"
                  ]
                }
              },
              {
                "status": {
                  "$in": [
                    "READ",
                    "UNREAD"
                  ]
                }
              },
              {
                "hidden": {
                  "$not": {
                    "$eq": true
                  }
                }
              },
              {
                "isPublic": {
                  "$not": {
                    "$eq": false
                  }
                }
              }
            ]
          },
          "nReturned": 144,
          "executionTimeMillisEstimate": 107,
          "works": 4108676,
          "advanced": 144,
          "needTime": 4108531,
          "needYield": 0,
          "saveState": 4108,
          "restoreState": 4108,
          "isEOF": 1,
          "direction": "forward",
          "docsExamined": 4108674
        }
      }
    },
    "allPlansExecution": []
  },
  "serverInfo": {
    "host": "Dats-iMac.local",
    "port": 27017,
    "version": "4.4.5",
    "gitVersion": "ff5cb77101b052fa02da43b8538093486cf9b3f7"
  },
  "ok": 1
}

/*
there are two primary values to examine
executionStats.nReturned — the number of documents returned, and
executionStats.totalDocsExamined — the number of documents scanned to find the result.

executionStats.nReturned = 20
executionStats.totalDocsExamined= 4108674
*/

// result form tool NoSQLBooster

const timelineQuery = COMMON_FUNCTIONS.buildTimelineQueryByUser(currentUser, 'RESERVATION');
timelineQuery.equalTo('isPushed', true);
timelineQuery.equalTo('status', CONSTANT.TIMELINE.STATUS.UNREAD);
timelineQuery.notEqualTo('isPublic', false);
timelineQuery.explain(true).find();
// result
{
  "queryPlanner": {
    "plannerVersion": 1,
    "namespace": "nailie-dev.Timeline",
    "indexFilterSet": false,
    "parsedQuery": {
      "$and": [
        {
          "isPushed": {
            "$eq": true
          }
        },
        {
          "receiverId": {
            "$eq": "5CDBC3bEuY"
          }
        },
        {
          "status": {
            "$eq": "UNREAD"
          }
        },
        {
          "_rperm": {
            "$in": [
              null,
              "*"
            ]
          }
        },
        {
          "mentionType": {
            "$in": [
              "BOOKING",
              "BOOKING_POINT_ADDED",
              "BOOKING_POINT_RANK_REWARD",
              "CARD_ERROR",
              "CHANGE_BOOKING_DATE",
              "LINKTO",
              "NAILIST_CAN_NOT_CHANGE_DATE",
              "NAILIST_EDIT_REPLY_REVIEW",
              "NAILIST_REPLY_REVIEW",
              "REVIEW",
              "REVIEWED"
            ]
          }
        },
        {
          "isPublic": {
            "$not": {
              "$eq": false
            }
          }
        }
      ]
    },
    "winningPlan": {
      "stage": "LIMIT",
      "limitAmount": 100,
      "inputStage": {
        "stage": "COLLSCAN",
        "filter": {
          "$and": [
            {
              "isPushed": {
                "$eq": true
              }
            },
            {
              "receiverId": {
                "$eq": "5CDBC3bEuY"
              }
            },
            {
              "status": {
                "$eq": "UNREAD"
              }
            },
            {
              "_rperm": {
                "$in": [
                  null,
                  "*"
                ]
              }
            },
            {
              "mentionType": {
                "$in": [
                  "BOOKING",
                  "BOOKING_POINT_ADDED",
                  "BOOKING_POINT_RANK_REWARD",
                  "CARD_ERROR",
                  "CHANGE_BOOKING_DATE",
                  "LINKTO",
                  "NAILIST_CAN_NOT_CHANGE_DATE",
                  "NAILIST_EDIT_REPLY_REVIEW",
                  "NAILIST_REPLY_REVIEW",
                  "REVIEW",
                  "REVIEWED"
                ]
              }
            },
            {
              "isPublic": {
                "$not": {
                  "$eq": false
                }
              }
            }
          ]
        },
        "direction": "forward"
      }
    },
    "rejectedPlans": []
  },
  "executionStats": {
    "executionSuccess": true,
    "nReturned": 0,
    "executionTimeMillis": 3514,
    "totalKeysExamined": 0,
    "totalDocsExamined": 4108674,
    "executionStages": {
      "stage": "LIMIT",
      "nReturned": 0,
      "executionTimeMillisEstimate": 113,
      "works": 4108676,
      "advanced": 0,
      "needTime": 4108675,
      "needYield": 0,
      "saveState": 4108,
      "restoreState": 4108,
      "isEOF": 1,
      "limitAmount": 100,
      "inputStage": {
        "stage": "COLLSCAN",
        "filter": {
          "$and": [
            {
              "isPushed": {
                "$eq": true
              }
            },
            {
              "receiverId": {
                "$eq": "5CDBC3bEuY"
              }
            },
            {
              "status": {
                "$eq": "UNREAD"
              }
            },
            {
              "_rperm": {
                "$in": [
                  null,
                  "*"
                ]
              }
            },
            {
              "mentionType": {
                "$in": [
                  "BOOKING",
                  "BOOKING_POINT_ADDED",
                  "BOOKING_POINT_RANK_REWARD",
                  "CARD_ERROR",
                  "CHANGE_BOOKING_DATE",
                  "LINKTO",
                  "NAILIST_CAN_NOT_CHANGE_DATE",
                  "NAILIST_EDIT_REPLY_REVIEW",
                  "NAILIST_REPLY_REVIEW",
                  "REVIEW",
                  "REVIEWED"
                ]
              }
            },
            {
              "isPublic": {
                "$not": {
                  "$eq": false
                }
              }
            }
          ]
        },
        "nReturned": 0,
        "executionTimeMillisEstimate": 113,
        "works": 4108676,
        "advanced": 0,
        "needTime": 4108675,
        "needYield": 0,
        "saveState": 4108,
        "restoreState": 4108,
        "isEOF": 1,
        "direction": "forward",
        "docsExamined": 4108674
      }
    },
    "allPlansExecution": []
  },
  "serverInfo": {
    "host": "Dats-iMac.local",
    "port": 27017,
    "version": "4.4.5",
    "gitVersion": "ff5cb77101b052fa02da43b8538093486cf9b3f7"
  },
  "ok": 1
}
// mongo shell
// query(2)
db.Timeline.find({
  "$and": [
      {
          "isPushed": {
              "$eq": true
          }
      },
      {
          "receiverId": {
              "$eq": "5CDBC3bEuY"
          }
      },
      {
          "status": {
              "$eq": "UNREAD"
          }
      },
      {
          "mentionType": {
              "$in": [
                  "BOOKING",
                  "BOOKING_POINT_ADDED",
                  "BOOKING_POINT_RANK_REWARD",
                  "CARD_ERROR",
                  "CHANGE_BOOKING_DATE",
                  "LINKTO",
                  "NAILIST_CAN_NOT_CHANGE_DATE",
                  "NAILIST_EDIT_REPLY_REVIEW",
                  "NAILIST_REPLY_REVIEW",
                  "REVIEW",
                  "REVIEWED"
              ]
          }
      },
      {
          "isPublic": {
              "$not": {
                  "$eq": false
              }
          }
      }
  ]
}).explain("executionStats");

// /api/functions/resetFavoriteUnreadByUser
const timelineQuery = COMMON_FUNCTIONS.buildTimelineQueryByUser(currentUser, 'FAVORITE');
timelineQuery.equalTo('isPushed', true);
timelineQuery.equalTo('status', CONSTANT.TIMELINE.STATUS.UNREAD);
timelineQuery.notEqualTo('isPublic', false);
timelineQuery.explain(true).find();
//result
{
  "queryPlanner": {
    "plannerVersion": 1,
    "namespace": "nailie-dev.Timeline",
    "indexFilterSet": false,
    "parsedQuery": {
      "$and": [
        {
          "isPushed": {
            "$eq": true
          }
        },
        {
          "receiverId": {
            "$eq": "5CDBC3bEuY"
          }
        },
        {
          "status": {
            "$eq": "UNREAD"
          }
        },
        {
          "_rperm": {
            "$in": [
              null,
              "*"
            ]
          }
        },
        {
          "mentionType": {
            "$in": [
              "FOLLOWING",
              "LIKE",
              "TAGGED_USER"
            ]
          }
        },
        {
          "isPublic": {
            "$not": {
              "$eq": false
            }
          }
        }
      ]
    },
    "winningPlan": {
      "stage": "LIMIT",
      "limitAmount": 100,
      "inputStage": {
        "stage": "COLLSCAN",
        "filter": {
          "$and": [
            {
              "isPushed": {
                "$eq": true
              }
            },
            {
              "receiverId": {
                "$eq": "5CDBC3bEuY"
              }
            },
            {
              "status": {
                "$eq": "UNREAD"
              }
            },
            {
              "_rperm": {
                "$in": [
                  null,
                  "*"
                ]
              }
            },
            {
              "mentionType": {
                "$in": [
                  "FOLLOWING",
                  "LIKE",
                  "TAGGED_USER"
                ]
              }
            },
            {
              "isPublic": {
                "$not": {
                  "$eq": false
                }
              }
            }
          ]
        },
        "direction": "forward"
      }
    },
    "rejectedPlans": []
  },
  "executionStats": {
    "executionSuccess": true,
    "nReturned": 22,
    "executionTimeMillis": 3536,
    "totalKeysExamined": 0,
    "totalDocsExamined": 4108674,
    "executionStages": {
      "stage": "LIMIT",
      "nReturned": 22,
      "executionTimeMillisEstimate": 71,
      "works": 4108676,
      "advanced": 22,
      "needTime": 4108653,
      "needYield": 0,
      "saveState": 4108,
      "restoreState": 4108,
      "isEOF": 1,
      "limitAmount": 100,
      "inputStage": {
        "stage": "COLLSCAN",
        "filter": {
          "$and": [
            {
              "isPushed": {
                "$eq": true
              }
            },
            {
              "receiverId": {
                "$eq": "5CDBC3bEuY"
              }
            },
            {
              "status": {
                "$eq": "UNREAD"
              }
            },
            {
              "_rperm": {
                "$in": [
                  null,
                  "*"
                ]
              }
            },
            {
              "mentionType": {
                "$in": [
                  "FOLLOWING",
                  "LIKE",
                  "TAGGED_USER"
                ]
              }
            },
            {
              "isPublic": {
                "$not": {
                  "$eq": false
                }
              }
            }
          ]
        },
        "nReturned": 22,
        "executionTimeMillisEstimate": 70,
        "works": 4108676,
        "advanced": 22,
        "needTime": 4108653,
        "needYield": 0,
        "saveState": 4108,
        "restoreState": 4108,
        "isEOF": 1,
        "direction": "forward",
        "docsExamined": 4108674
      }
    },
    "allPlansExecution": []
  },
  "serverInfo": {
    "host": "Dats-iMac.local",
    "port": 27017,
    "version": "4.4.5",
    "gitVersion": "ff5cb77101b052fa02da43b8538093486cf9b3f7"
  },
  "ok": 1
}
