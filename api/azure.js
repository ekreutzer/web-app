var axios = require('axios');
var jsSHA = require('jssha');
var convertTime = require('convert-time');
var auth = require('../credentials');

var user_data;

exports.notifyMembers = async function (phone, name, groupName, eid, from, to, alertCtrl){
    from = from.replace(/:/g,'-');
    to = to.replace(/:/g,'-');

    let phoneNumber = String(phone);
    let uri1 = "https://rhume-service.herokuapp.com/Tasks/notifymembers"
    
    await axios.post(uri1,{
        phone:phoneNumber,
        name:name,
        eid:eid,
        from:from,
        to:to,
        groupName:groupName
     })
 
     .then(function(response){

     })

     .catch( function(err){
        alert('Something went wrong. Please try again.');        
    })

    
}

exports.notifyGeneral = async function (phone, name, content, alertCtrl){
    content = content.replace(/:/g,'-');
    let phoneNumber = String(phone);
    
    let uri1 = "https://rhume-service.herokuapp.com/Tasks/notify";
    
    await axios.post(uri1,{
        phone:phoneNumber,
        name:name,
        content:content
     })
 
     .then(function(response){

     })

     .catch( function(err){
        alert('Something went wrong. Please try again.');        
    })

    
}

exports.getAnnouncements = async function (announcement){
    let uri1 = "https://rhume-service.herokuapp.com/Tasks/getannouncements";
    
        await axios.get(uri1,{
           
        })
    
        .then(function(response){
            announcement.push({title:response.data[0].Announcement});              
        })

        .catch(function(err){
            return false;
        })
}

exports.updateAnnouncements = async function (announcement){
    let date = new Date();
    let day = String(date.getMonth()) +"-"+ String(date.getDate()) +"-"+String(date.getFullYear());

    let uri1 = "https://rhume-service.herokuapp.com/Tasks/updateannouncements";
    
    
        await axios.post(uri1,{
            announcement:announcement,
            date:day
        })
    
        .then(function(response){
        })

        .catch(function(err){
            return false;
        })
}


exports.login =  async function (em,pwd,res){
    
    let shaObj = new jsSHA("SHA-256", "TEXT");
    shaObj.update(pwd);
    let hash = shaObj.getHash("HEX");
    let password;
    password = hash;
    
    let uri1 = "https://rhume-service.herokuapp.com/Tasks/users";
    
        await axios.get(uri1,{
            headers: {
                auth: auth.token
            }
           
        })
    
        .then(function(response){
            var auth = false;

            for (var j = 0; j < response.data.length; j++){
                if ( response.data[j].Username == em && response.data[j].Password == password){
                    auth = true;                    
                        //console.log(response.data[j]);
                        res.render('home',{user: response.data[j]});
                        user_data = response.data[j];
                        console.log(user_data);
                        
                        

                    
                }
            }
              

            if(auth == false) {
                console.log("Incorrect credentials.");
            }
            // alert('Incorrect credentials. Please try again.');
            
        })

        .catch(function(err){
            // alert('Something went wrong. Please try again.');        
        })
          
        }


exports.getAllUsers = async function (users){
            
    let uri1 = "https://rhume-service.herokuapp.com/Tasks/users";
                
    await axios.get(uri1,{
        headers: {
            auth: auth.token
        }        
    })

    .then(function(response){

    for(var i = 0; i < response.data.length; i++){
        users.push(
            response.data[i]
        )
    }
    
    })
                  
}

exports.updateUserAccount = async function (id, name, age, email, alertCtrl){
    
    let uri1 = "https://rhume-service.herokuapp.com/Tasks/updateaccount";
    
    await axios.post(uri1,{
        id:id,
        name:name,
        age:age,
        email:email
    })
    
    .then( async function(response){

    })

    .catch( function(err){
        presentConfirm(alertCtrl,'Something went wrong. Please try again.');        
    })
}

exports.deleteUserAccount = async function (user, alertCtrl){
    let uri1 = "https://rhume-service.herokuapp.com/Tasks/deleteUserAccount/"+user.ID;
    
    await axios.get(uri1,{
           
    })
    
    .then( async function(response){

    })

    .catch( function(err){
        presentConfirm(alertCtrl,'Something went wrong. Please try again.');        
    })
}

exports.getUserByID = async function (user, alertCtrl){
    let uri1 = "https://rhume-service.herokuapp.com/Tasks/getUserByID/"+user.ID;
    
    await axios.get(uri1,{
           
    })
    
    .then( async function(response){
       user.Submissions = response.data[0].Submissions;
    })

    .catch( function(err){
        presentConfirm(alertCtrl,'Something went wrong. Please try again.');        
    })
}

exports.getUsers = async function (name,age,username,phone,pwd,navCtrl, alertCtrl){
    let uri1 = "https://rhume-service.herokuapp.com/Tasks/users";
    var alreadyMember = false;
    await axios.get(uri1,{
        headers: {
            auth: authToken
        }
    })
    
    .then( async function(response){
        for(var i = 0; i < response.data.length; i++){
            if (response.data[i].Username == username){
                    alreadyMember = true;
            }
        }

        if (alreadyMember == true){
          presentConfirm(alertCtrl,'There is already an account with that email.');
        }
        else{
            await addUser(name,age,username,phone,pwd,navCtrl,alertCtrl);
        }

    })

    .catch( function(err){
        presentConfirm(alertCtrl,'Something went wrong. Please try again.');        
    })

}

exports.getBookings = async function (id, bookings){
    let uri1 = "https://rhume-service.herokuapp.com/Tasks/bookings/"+id;
    
    await axios.get(uri1,{
    })

    .then(function(response){
        for (var i = 0; i < response.data.length; i++){
            if(response.data[i].Room == '7428') response.data[i].Room = '031';
            else if(response.data[i].Room == '7430') response.data[i].Room = '050';
            else if(response.data[i].Room == '19452') response.data[i].Room = '105';            
            else if(response.data[i].Room == '7431') response.data[i].Room = '201';
            else if(response.data[i].Room == '7432') response.data[i].Room = '254';
            else if(response.data[i].Room == '7433') response.data[i].Room = '255';
            else if(response.data[i].Room == '7434') response.data[i].Room = '256';
            else if(response.data[i].Room == '7435') response.data[i].Room = '257';
            else if(response.data[i].Room == '7436') response.data[i].Room = '258';
            else if(response.data[i].Room == '7437') response.data[i].Room = '301';
            response.data[i].From = convertTime(response.data[i].From);
            response.data[i].To = convertTime(response.data[i].To);            
            bookings.push(response.data[i]);
        }            
    })  
    .catch(function(err){

    }) 
}

exports.addBooking = async function (userID, room, from, to, date, bookingID){
    let uri1 = "https://rhume-service.herokuapp.com/Tasks/bookings";
    
    await axios.post(uri1,{
        userID:userID,
        room:room,
        from:from,
        to:to,
        date:date,
        bookingID:bookingID
    })

    .then(function(response){
    })  
    .catch(function(err){

    }) 
}

exports.cancelBooking = async function (booking,alertCtrl){
    let filler = [];
    await libcal.getToken("cancel",filler,filler,alertCtrl,"",booking);

    let uri1 = "https://rhume-service.herokuapp.com/Tasks/deletebooking";
    
    await axios.post(uri1,{
        id:booking.ID
    })

    .then(function(response){
        console.log(response);
    })  
    .catch(function(err){
        presentConfirm(alertCtrl,'Something went wrong. Please try again.');                
    }) 
    
}

exports.getAllOpenSpaces = async function (spaces,alertCtrl){
    let uri1 = "https://rhume-service.herokuapp.com/Tasks/openspaces";
    
    await axios.get(uri1,{
            
    })

    .then(function(response){
        for(var i = 0; i < response.data.length; i++){
            spaces.push(response.data[i])
        }             
    })  
    .catch(function(err){
        presentConfirm(alertCtrl,'Something went wrong. Please try again.');        
        
    })    
}

exports.getSpaces = async function (id,spaces, alertCtrl){
            
    let uri1 = "https://rhume-service.herokuapp.com/Tasks/spaces/"+id;
            
    await axios.get(uri1,{
                   
    })
    
    .then(function(response){
        for(var i = 0; i < response.data.length; i++){
            spaces.push(response.data[i])
        }             
        })  
    .catch(function(err){
        presentConfirm(alertCtrl,'Something went wrong. Please try again.');        
        
    })         
}

exports.getSpaceData = async function (id,spaces, alertCtrl){
    
    let uri1 = "https://rhume-service.herokuapp.com/Tasks/spacedata/"+id;
    
    await axios.get(uri1,{
            
    })
    
    .then(function(response){

        for (var i = 0; i < response.data.length; i++){
            for (var j = 0; j < spaces.length; j++){
                if (response.data[i].SpaceID == spaces[j].ID){
                if (response.data[i].Rating == -1){
                        spaces[j].numRatings = response.data[i].NumRatings;                                    
                        spaces[j].status = -1;
                        spaces[j].fullness = "No data available";
            } else {
                spaces[j].numRatings = response.data[i].NumRatings;                                
                spaces[j].status = response.data[i].Rating;
                if (spaces[j].status >= 0 && spaces[j].status <= 3)spaces[j].fullness =  "Open";
                else if (spaces[j].status > 3 && spaces[j].status <= 6)spaces[j].fullness = "Almost Full";
                else if (spaces[j].status > 6) spaces[j].fullness ="Packed";
            }
            }

        }
    }
    })   
    
    .catch(function(err){
        presentConfirm(alertCtrl,'Something went wrong. Please try again.');        
    })
}

exports.deleteMember = async function (member, groupid, alertCtrl){
    let uri1 = "https://rhume-service.herokuapp.com/Tasks/deletemember";
    
    await axios.post(uri1,{
        id:member.UserID,
        groupID:groupid
    })
    
    .then(function(response){
        presentConfirm(alertCtrl,member.Name+" was removed.");        
        
    })  

    .catch(function(err){
        presentConfirm(alertCtrl,'Something went wrong. Please try again.');        
        
    })
}

exports.updateAverages = async function (alertCtrl){
    let uri1 = "https://rhume-service.herokuapp.com/Tasks/updateaverages";
    
    await axios.get(uri1,{
            
    })
    
    .then(function(response){
        
    })  

    .catch(function(err){
        presentConfirm(alertCtrl,'Something went wrong. Please try again.');        
        
    })
}

exports.addSpaceData = async function (userID,userEmail,spaceID,rating,alertCtrl){

    let date = new Date();
    let hour = date.getHours();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let fullDate = String(day)+"-"+String(month)+"-"+String(year);
    
    let uri1 = "https://rhume-service.herokuapp.com/Tasks/spacedata";
    
    await axios.post(uri1,{
        userID:userID,
        spaceID:spaceID,
        email:userEmail,
        rating:rating,
        hour:hour,
        date:fullDate
    })
    
    .then(function(response){
    })     
    
    .catch(function(err){
        presentConfirm(alertCtrl,'Something went wrong. Please try again.');        
    })
}

exports.getBuildings = async function (place, buildings, alertCtrl){
                    
    let uri1 = "https://rhume-service.herokuapp.com/Tasks/buildings/"+ place;
                    
    await axios.get(uri1,{
                           
    })
    
    .then(function(response){
       
        for(var i = 0; i < response.data.length; i++){
            buildings.push({
                ID: response.data[i].ID,
                name:response.data[i].Building,
                address:response.data[i].Address,
                zip:response.data[i].Zip,
                dbname:response.data[i].ID,
                building:response.data[i].BuildingId,
                img:response.data[i].Image,
                weekdayHours:response.data[i].WeekdayHours,
                fridayHours:response.data[i].FridayHours,
                saturdayHours:response.data[i].SaturdayHours,
                sundayHours:response.data[i].SundayHours,
                spaces: response.data[i].Spaces,
                Lat: response.data[i].Lat,
                Long: response.data[i].Long
            })
        }
    })

    .catch(function(err){
        presentConfirm(alertCtrl,'Something went wrong. Please try again.');        
    })
                          
}

exports.getRooms = async function (building,rooms,bookings, alertCtrl, viewCtrl){
    
    let uri1  = "https://rhume-service.herokuapp.com/Tasks/rooms/"+ building;

    await axios.get(uri1,{
           
    })
    
    .then(async function(response){
        for(var i = 0; i < response.data.length; i++){
            rooms.push({
                building:response.data[i].Building,
                name: response.data[i].Room,
                type: response.data[i].Type,
                capacity: "Capacity: " +response.data[i].Capacity,
                eid: response.data[i].eid,
                status: ""
            })
        }

        await libcal.getToken("bookings",bookings,rooms,alertCtrl,viewCtrl);
    })

    .catch(function(err){
        presentConfirm(alertCtrl,'Something went wrong. Please try again.');        
    })
          
}

exports.addUser = async function (name, age, username, phone, password,navCtrl, alertCtrl){
    if(phone == undefined) phone = "00";
    
    let uri1  = "https://rhume-service.herokuapp.com/Tasks/adduser";
    
    await axios.post(uri1,{
        name:name,
        age:age,
        username:username,
        phone:phone,
        password:password
    })

    .then(function(response){
        presentConfirm(alertCtrl,"Account created!");
        navCtrl.pop();
    })

    .catch(function(err){
        presentConfirm(alertCtrl,"Something went wrong. Please try again.");
    })
          
}

/////////////////////////////////////////  STUDY GROUPS  ///////////////////////////////////////////

exports.getAllStudyGroups = async function (groups){
    let uri1  = "https://rhume-service.herokuapp.com/Tasks/allstudygroups";
    
    //get eventIDs for events that user has liked
    await axios.get(uri1,{
            
    })

    .then(function(response){
        for(var i = 0; i < response.data.length; i++){
            groups.push(response.data[i])
        }      
    })

    .catch(function(err){
        // presentConfirm("Something went wrong. Please try again.","");
    })

}

exports.getStudyGroupsByID = async function (groupID,group){
    let uri1  = "https://rhume-service.herokuapp.com/Tasks/studygroups/"+groupID;

    //get eventIDs for events that user has liked
    await axios.get(uri1,{
            
    })

    .then(function(response){
        for(var i = 0; i < response.data.length; i++){
            group.studyGroupDetails.push(response.data[i]);
        }         
    })

    .catch(function(err){
        // presentConfirm("Something went wrong. Please try again.","");
    })

}

exports.deleteStudyGroup = async function (groupID){
    let uri1  = "https://rhume-service.herokuapp.com/Tasks/deleteStudyGroup/"+groupID;
    
    await axios.get(uri1,{})

    .then(function(response){
    })

    .catch(function(err){
        // presentConfirm("Something went wrong. Please try again.","");
    })
}
    

exports.addStudyGroup = async function (groupName, major, user, viewStatus, day1, day2, selectedMembers, title){
    let uri1  = "https://rhume-service.herokuapp.com/Tasks/addStudyGroup"

    await axios.post(uri1,{
            groupName:groupName,
            name:user.Name,
            members: 0,
            topic:major,
            username:user.Username,
            viewStatus:viewStatus,
            userID:user.ID,
            day1: day1,
            day2: day2
    })

    .then(async function(response){

        let groups = [];
        await getAllStudyGroups(groups);
        var largest = Number(groups[0].ID);
        for(var i = 0; i < groups.length; i++){
            if (Number(groups[i].ID) > largest){
                largest = Number(groups[i].ID);
            }
        }

        let newGroupID = largest;
        
        //add SG creator here
        await addStudyGroupMember(user.Name,user.ID,newGroupID,user.Username,user.Phone);

        //send invitations here
        if(selectedMembers.length > 0){
            for (var b = 0; b < selectedMembers.length; b++){
                // title, toID, fromID, groupID, groupName
                await sendInvitation(selectedMembers[b].Name, title,selectedMembers[b].ID, user.ID,newGroupID,groupName,user.Username,user.Phone);
                // await addStudyGroupMember(selectedMembers[i].ID,newGroupID,selectedMembers[i].Username,selectedMembers[i].Phone);                
            }
        }
                        
    })

    .catch(function(err){
        // presentConfirm("Something went wrong. Please try again.","");
    })

}



exports.getAllMembersofGroup = async function (groupID,members){
    let uri1  = "https://rhume-service.herokuapp.com/Tasks/getallmembers/"+groupID;
    await axios.get(uri1,{
        
})
.then(function(response){
    for(var i = 0; i < response.data.length; i++){
        if(response.data[i].Email != "undefined"){
        members.push({
            Name:response.data[i].Name,
            UserID: response.data[i].UserID,
            GroupID: response.data[i].GroupID,
            Email: response.data[i].Email,
            Phone: response.data[i].Number            
        })
        }
    }         
})
.catch(function(err){
    // presentConfirm("Something went wrong. Please try again.","");
})

}

exports.setGroupStatus = async function (id, status){
    let uri1  = "https://rhume-service.herokuapp.com/Tasks/setGroupStatus";
    await axios.post(uri1,{
        GroupID:id,
        Status:status
    })
    .then(function(response){
        console.log('Success');
    })

    .catch(function(err){
        // presentConfirm("Something went wrong. Please try again.","");
    })
}

//get all study groups that a member is a part of
exports.getStudyGroupMember = async function (user){
    let uri1  = "https://rhume-service.herokuapp.com/Tasks/studygroupmembers/"+user.ID;
    user.studyGroups = [];
    await axios.get(uri1,{
            
    })
    .then(function(response){
        for(var i = 0; i < response.data.length; i++){
            user.studyGroups.push({
                UserID: response.data[i].UserID,
                GroupID: response.data[i].GroupID,
                Email: response.data[i].Email
            })
        }         
    })
    .catch(function(err){
        // presentConfirm("Something went wrong. Please try again.","");
    })

}

exports.sendInvitation = async function (userName, title, toID, fromID, groupID, groupName, username, phone){
        let date = new Date();
        let time = String(date.getDate()) +"-"+ String(date.getMonth()) +"-"+ String(date.getFullYear());

        let uri1  = "https://rhume-service.herokuapp.com/Tasks/notifications";
        //get eventIDs for events that user has liked
        await axios.post(uri1,{
            name:userName,
            title:title,
            toID:toID,
            fromID:fromID,
            groupID:groupID,
            groupName:groupName,
            time:time,
            username:username,
            phone:phone
        })
        .then(function(response){
                    
        })
        .catch(function(err){
            // presentConfirm("Something went wrong. Please try again.","");
        })
}

exports.getAdvertisements = async function (advertisements){
    let uri1  = "https://rhume-service.herokuapp.com/Tasks/advertisements";
    //get eventIDs for events that user has liked
    await axios.get(uri1,{
            
    })
    .then(function(response){
        for(var i = 0; i < response.data.length; i++){
            advertisements.push(response.data[i]);
        }
    })
    .catch(function(err){
        // presentConfirm("Something went wrong. Please try again.","");
    })
}

exports.handleNotification = async function (action, id){
    let uri1  = "https://rhume-service.herokuapp.com/Tasks/handlenotifications/"+action+":"+id;
    //get eventIDs for events that user has liked
    await axios.post(uri1,{
            
    })
    .then(function(response){
                
    })
    .catch(function(err){
        // presentConfirm("Something went wrong. Please try again.","");
    })
}

exports.getNotifications = async function (user, alertCtrl){
    let uri1  = "https://rhume-service.herokuapp.com/Tasks/notifications/"+user.ID;
    
    await axios.get(uri1,{
           
    })
    
    .then( async function(response){
       user.notifications = [];
       for(var i = 0; i < response.data.length; i++){
        var type = '';
        if(response.data[i].Title.indexOf("invited") > 0) type = 'groupInvite'
        else if(response.data[i].Title.indexOf("requested") > 0 ) type = 'requestToJoin';
        else {
            type = 'general';
        }
        user.notifications.push({
            Name:response.data[i].Name,
            ID: response.data[i].ID,
            title: response.data[i].Title,
            toID: response.data[i].ToID,
            fromID: response.data[i].FromID,
            groupID: response.data[i].GroupID,
            groupName: response.data[i].GroupName,
            time: response.data[i].Time,
            username: response.data[i].Username,
            phone: response.data[i].Phone,
            type: type
       })
    }
    })

    .catch( function(err){
        presentConfirm(alertCtrl,'Something went wrong. Please try again.');        
    })
}

exports.getConversations = async function (groupID,conversations){
    let uri1  = "https://rhume-service.herokuapp.com/Tasks/conversations/"+groupID;
    //get eventIDs for events that user has liked
    await axios.get(uri1,{
            
    })
    .then(function(response){
        for(var i = 0; i < response.data.length; i++){
            conversations.push(response.data[i]);
        }
    })
    .catch(function(err){
        // presentConfirm("Something went wrong. Please try again.","");
    })
}

exports.getMessages = async function (groupID,messages,userName){
    let uri1  = "https://rhume-service.herokuapp.com/Tasks/messages/"+groupID;
    //get eventIDs for events that user has liked
    await axios.get(uri1,{
            
    })
    .then(function(response){
        for(var i = 0; i < response.data.length; i++){
            var position = 'left';
            if(response.data[i].SenderName == userName) {
                position = 'right';
            }
            messages.push({
                 position: position,
                 content: response.data[i].Body,
                 senderName: response.data[i].SenderName,
                 time: response.data[i].Time
                }

            )
        }
    })
    .catch(function(err){
        // presentConfirm("Something went wrong. Please try again.","");
    })
}

exports.addMessage = async function (groupID,message){
    let uri1  = "https://rhume-service.herokuapp.com/Tasks/messages";
    //get eventIDs for events that user has liked
    await axios.post(uri1,{
        GroupID:groupID,
        Body:message.content,
        SenderName:message.senderName,
        Time:message.time
    })
    .then(function(response){
        
    })
    .catch(function(err){
        // presentConfirm("Something went wrong. Please try again.","");
    })
}

exports.addStudyGroupMember = async function (name,userID, groupID, email, number){
    
        let uri1  = "https://rhume-service.herokuapp.com/Tasks/addMember";
        //get eventIDs for events that user has liked
        await axios.post(uri1,{
            name:name,
            userID:userID,
            groupID:groupID,
            email:email,
            number:number
        })
        .then(function(response){
                    
        })
        .catch(function(err){
            // presentConfirm("Something went wrong. Please try again.","");
        })

}

exports.leaveStudyGroupByMember = async function (userID,groupID){
    //"/removemember/:groupID?/:userID?'
    let uri1  = "https://rhume-service.herokuapp.com/Tasks/removemember/"+groupID+"/"+userID;
    
    await axios.get(uri1,{
        
    })
    .then(function(response){
            
    })
    .catch(function(err){
            // presentConfirm("Something went wrong. Please try again.","");
    })
}




