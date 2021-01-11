
// we only load the Elements
export default async function() {
  return [
    {
      id: 'e01',
      title: 'first element',
      type: 'text',
      text: 'This is the comment that belong here',
      columnId: 'e01'
    },
    {
      id: 'e03',
      title: 'first image',
      type: 'image',
      imageUrl: 'http://www.jaaps.nu/wp-content/uploads/2016/08/DSC5213-e1472502299332.jpg',
      columnId: 'e01'
    }
  ]
}
