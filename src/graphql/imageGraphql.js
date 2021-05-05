
export const fetchImagesQuery = `
query getImages{
	getAllImages{
    _id
    creatorUsername
    creatorId
    image
    likes
    createdAt
    tags
  }
}`

export const createImageMutation = `
mutation createImage($image: String!, $creatorUsername: String!, $tags: [String!]){
  createImage(imageInput: {image:$image, creatorUsername:$creatorUsername, tags:$tags } )
  {
    _id
    creatorUsername
    creatorId
    image
    likes
    createdAt
    tags
  }
}`

export const likeImageMutation = `
mutation like($imageId:ID!){
	likeImageHandler( imageId:$imageId ){
		_id
    creatorUsername
    creatorId
    image
    likes
    createdAt
    tags
  }
}`

export const saveImageMutation = `
mutation save($imageId:ID!){
	saveImageHandler( imageId:$imageId ){
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
`

export const deleteImageMutation = `
mutation deleteImage($imageId:ID!){
  deleteImage(imageId:$imageId){
    message
  }
}
`

export const editImageMutation = `
mutation update($imageId:ID!, $image:String, $creatorUsername:String, $tags:[String!]){
  updateImage(id:$imageId, imageInput: {image:$image, creatorUsername:$creatorUsername, tags:$tags }){
    _id
    creatorUsername
    creatorId
    image
    likes
    createdAt
    tags
  }
}
`

export const findImagesByTagsQuery = `
query findByTag($tags:[String!]!){
  findImagesByTags(tags:$tags){
    _id
    creatorUsername
    creatorId
    image
    likes
    createdAt
    tags
  }
}
`
