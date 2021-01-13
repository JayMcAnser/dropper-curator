/**
 * fake data
 */

const data = async function () {
  return [
    {
      title: 'column 1',
      elements: [
        { id: 1, title: 'first element', type:'text' },
        { id: 'e-02', title: 'second element', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque viverra ipsum odio, at egestas eros rutrum ac. Curabitur lacinia eu metus sit amet commodo. Sed neque libero, varius a enim in, pellentesque consectetur lectus. Maecenas dictum mauris vestibulum, venenatis turpis ut, molestie dolor. Sed tristique interdum mattis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Praesent ut viverra lectus. Nullam eleifend, nisl vel porttitor semper, mauris libero mattis erat, eu accumsan lacus dolor convallis erat. Sed ullamcorper, lacus eget ornare porta, eros enim consectetur diam, nec dapibus massa nisi euismod turpis. Ut rutrum felis ut massa accumsan condimentum. In volutpat elit ut felis laoreet, eget dignissim lacus rutrum. Donec non sapien malesuada metus lacinia aliquet ut at felis.'},
        { id: 'e-03', text:'Sometimes there is no title, so don\'t place it' },
      ]
    },
    {
      title: 'column 2',
      elements: [
        { id: 'e-04', title: 'the other element', type:'text' },
        { id: 'e-05', title: 'image ', type: 'image', imageUrl: 'http://www.jaaps.nu/wp-content/uploads/2016/08/DSC5213-e1472502299332.jpg',},
        { id: 'e-02'},
        { id: 'e-03'},
      ]
    },
    {
      title: 'column 3',
      elements: [
        { id: 1, title: 'next element', type:'text' },
        { id: 'e-02', title: 'second element' },
        { id: 'e-03'  },
      ]
    },
    {
      title: 'column 4',
      elements: [
        { id: 'e-04', title: 'the other element', type:'text' },
        { id: 'e-06', title: 'image ', type: 'image', imageUrl: 'http://www.jaaps.nu/wp-content/uploads/2017/01/20110803-_MG_3504-e1484739016156.jpg',},
        { id: 'e-02'},
        { id: 'e-07', title: 'image ', type: 'image', imageUrl: 'http://www.jaaps.nu/wp-content/uploads/2016/11/berken-e1491126449605.jpg',},
        { id: 'e-03'},
        { id: 'e-08', type: 'image', imageUrl: 'http://www.jaaps.nu/wp-content/uploads/2016/01/20130924_124943.jpg',},

      ]
    }
  ]
}
export default data;
