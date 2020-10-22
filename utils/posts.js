// import {makeid} from './randomid';
const {makeid} = require('./randomid');
const n = 10;
const posts = [
    {
        id: makeid(n),
        title: 'Book 1',
        review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna. Aliquam ut porttitor leo a diam sollicitudin. Eu mi bibendum neque egestas congue quisque. Ut sem nulla pharetra diam. A pellentesque sit amet porttitor eget dolor morbi. Venenatis urna cursus eget nunc scelerisque viverra. Malesuada fames ac turpis egestas maecenas. Morbi enim nunc faucibus a pellentesque sit amet. Elementum integer enim neque volutpat ac. Enim ut sem viverra aliquet eget sit amet tellus cras.',
        rating: 7,
        pages: {
            from: 1,
            to: 100
        },
        comments: [
            {
                id: makeid(n),
                name: 'Parent 1',
                comment: 'Well written'
            },
            {
                id: makeid(n),
                name: 'Parent 2',
                comment: 'Well said'
            }
        ],
        created_at: Date.now() - 60000
    },
    {
        id: makeid(n),
        title: 'Book 2',
        review: 'In hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit. Venenatis urna cursus eget nunc scelerisque viverra mauris. Id donec ultrices tincidunt arcu non sodales neque. Eu consequat ac felis donec et odio pellentesque diam volutpat. Tristique senectus et netus et malesuada fames. Mauris pellentesque pulvinar pellentesque habitant morbi tristique. Nunc faucibus a pellentesque sit amet porttitor. Pellentesque massa placerat duis ultricies lacus sed turpis. Ut faucibus pulvinar elementum integer enim neque volutpat ac. Magna fermentum iaculis eu non. Imperdiet sed euismod nisi porta lorem mollis aliquam. Facilisis sed odio morbi quis commodo odio. Facilisis sed odio morbi quis commodo odio. Amet cursus sit amet dictum sit amet. Pretium nibh ipsum consequat nisl vel. Fames ac turpis egestas maecenas pharetra.        ',
        rating: 2,
        pages: {
            from: 1,
            to: 100
        },
        comments: [
            {
                id: makeid(n),
                name: 'Parent 1',
                comment: 'Well written'
            },
            {
                id: makeid(n),
                name: 'Parent 2',
                comment: 'Well said'
            }
        ],
        created_at: Date.now() - 60000
    },
    {
        id: makeid(n),
        title: 'Book 3',
        review: 'Iaculis urna id volutpat lacus laoreet non. Elementum nisi quis eleifend quam. Purus faucibus ornare suspendisse sed. Et ultrices neque ornare aenean euismod elementum nisi quis eleifend. Sagittis purus sit amet volutpat consequat mauris. Nec dui nunc mattis enim ut tellus. A erat nam at lectus urna duis convallis. Nec feugiat nisl pretium fusce id velit ut tortor pretium. Faucibus nisl tincidunt eget nullam non nisi est. Imperdiet massa tincidunt nunc pulvinar sapien et. Sapien pellentesque habitant morbi tristique senectus et netus. Lorem dolor sed viverra ipsum nunc aliquet bibendum. Tellus id interdum velit laoreet id donec ultrices tincidunt. Nibh sit amet commodo nulla facilisi nullam.        ',
        rating: 10,
        pages: {
            from: 1,
            to: 100
        },
        comments: [
            {
                id: makeid(n),
                name: 'Parent 1',
                comment: 'Well written'
            },
            {
                id: makeid(n),
                name: 'Parent 2',
                comment: 'Well said'
            }
        ],
        created_at: Date.now() - 60000
    },
];

module.exports = posts;