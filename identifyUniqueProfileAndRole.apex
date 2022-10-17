    /**
    ** Script to see Unique Profiles and Roles from Organization
    **/
List<User> userList = [ SELECT id, Profile.name, ProfileId, Username, IsActive, UserRole.Name 
FROM User
ORDER BY Profile.name ASC
LIMIT 50000];
System.debug('Users count: ' + userList.size());
//Declaring Set to store Unique Profiles
Set<String> profileSet = new Set<String>();

//Declaring Set to store Unique Roles
Set<String> roleSet = new Set<String>();

//Return NULL if no data has been retrieved from the object
if(userList == NULL || userList.size() == 0)
    return;

//Create Profile Set and return it
for(User user:userList){
if (String.isNotBlank(user.profile.name)) {
    profileSet.add(user.profile.name);
    }
}
System.debug('Unique Profiles count: ' + profileSet.size() + '\n' + ' Profile Names: ' + profileSet);

//Create Role Set and return it
for(User user:userList){
if (String.isNotBlank(user.UserRole.Name)) {
    roleSet.add(user.UserRole.Name);
    }
}
System.debug('Unique Roles count: ' + roleSet.size() + '\n' + ' Role Names: ' + roleSet);

//Get Set of User Ids
Set<Id> ids = new Set<Id>(new Map<Id, User>(userList).keySet());
System.debug('User Ids as Set<Id>: ' + ids);