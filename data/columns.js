// we only load the Elements
export default async function() {
  return [
    {
      title: 'column 1',
      elements: [
        {id: 'e1', title: 'element 1'},
        {id: 'e2', title: 'element 2'}
      ]
    },
    {
      title: 'column 2',
    }
  ]
}
