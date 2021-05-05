export const signInUserQuery = `
query SI($email: String!, $password: String!){
    signInUser(email:$email, password:$password){
      token
      tokenExpiration
      userId
      currentUserData{
        username
        email
        createdImages{
          _id
          creatorUsername
          creatorId
          image
          likes
          createdAt
          tags
        }
        savedImages{
          _id
          creatorUsername
          creatorId
          image
          likes
          createdAt
          tags
        }
      }
      
    }
  }
`

export const signUpMutation = `
mutation SU($email: String!, $password: String!, $username: String!){
  signUpUser(userInput:{ email:$email, password:$password, username:$username }){
		token
    tokenExpiration
    userId
    currentUserData{
      username
      email
      createdImages{
        _id
        image
      }
      likedImages{
        _id
      }
      savedImages{
                _id
      }
    }
  }
}`