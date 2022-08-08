export const typeAlphabets = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

export const levels  = [
    "foundation",
    "intermediate",
    "senior phase",
    "FET"
  ]


  export const Rooms = ["R304", "R209", "R404"]



  export const authorities: any[] =    [ {
    id   : 'dashboard',
    title: 'Dashboard',
    type : 'basic',
    icon : 'heroicons_outline:chart-pie',
    link : '/dashboard'
},
{
    id   : 'staff',
    title: 'Staff Members',
    type : 'basic',
    icon : 'heroicons_outline:user-group',
    link : '/staff/staff-list'
},
{
    id   : 'administrator',
    title: 'Administrative staff',
    type : 'basic',
    icon : 'heroicons_outline:identification',
    link : '/administrators/administrators-list'
},
{
    id   : 'Product',
    title: 'Products',
    type : 'collapsable',
    icon : 'heroicons_outline:cube',
    link : '/Products',
    children: [
        {
            id   : 'Products',
            title: 'Products',
            type : 'basic',
            link : '/Products/product-list'
        },
        {
            id   : 'Product-type',
            title: 'Product type',
            type : 'basic',
            link : '/Products/product-type'
        },
        {
            id   : 'Stock-take',
            title: 'Stock-take',
            type : 'basic',
            link : '/Products/stock-take'
        }
    ]
},
{
    id   : 'StaffProduct',
    title: 'Sales',
    type : 'basic',
    icon : 'heroicons_outline:shopping-bag',
    link : '/staff-Products/staff-pro'
},
{
    id   : 'events',
    title: 'Events',
    type : 'collapsable',
    icon : 'heroicons_outline:calendar',
    link : '/events',
    children: [
        {
            id   : 'user-interface.forms.fields',
            title: 'Events',
            type : 'basic',
            link : '/events/event-list'
        },
        {
            id   : 'user-interface.forms.fields',
            title: 'Event Income',
            type : 'basic',
            link : '/events/event-income'
        },
    ]
},
{
    id   : 'extra-mural-activities',
    title: 'Extra Mural Activities',
    type : 'basic',
    icon : 'heroicons_outline:puzzle',
    link : '/extra-mural-activities'
},
{
    id   : 'grades',
    title: 'Grades',
    type : 'basic',
    icon : 'heroicons_outline:identification',
    link : '/grades'
},
{
    id   : 'fees',
    title: 'Fees',
    type : 'basic',
    icon : 'heroicons_outline:chart-bar',
    link : '/fees'
},
{
    id   : 'reports',
    title: 'Reports',
    type : 'collapsable',
    icon : 'heroicons_outline:chart-square-bar',
    link : '/reports',
    children: [
        {
            id   : 'sales',
            title: 'Sales',
            type : 'basic',
            link : '/reports/sales'
        }
    ]
},
{
    id  : 'divider-2',
    type: 'divider'
}, {
    id   : 'staff.teacher.myclasses',
    title: 'My Classes',
    type : 'basic',
    icon : 'heroicons_outline:chart-bar',
    link : '/myclasses'
},
{
    id      : 'staff.calendar',
    title   : 'Calendar',
    subtitle: '3 upcoming events',
    type    : 'basic',
    icon    : 'heroicons_outline:calendar',
    link    : '/calendar'
},

{
    id  : 'divider-2',
    type: 'divider'
},
{
    id   : 'pupil',
    title: 'Pupil',
    type : 'collapsable',
    icon : 'heroicons_outline:users',
    link : '/pupil',
    children: [
        {
            id   : 'pupil.list.register',
            title: 'Pupil List',
            type : 'basic',
            link : '/pupil/pupil-list'
        },
        {
            id   : 'pupil.activities',
            title: 'Activities',
            type : 'basic',
            link : '/pupil/activities'
        },
    ]
},
];


export const displayedAuth: any[] =
[{
id   : 'dashboard',
title: 'Dashboard',
},
{
id   : 'staff',
    title: 'Staff Members',
},
{
id   : 'administrator',
title: 'Administrators',
},
{
id   : 'Product',
title: 'Products',
},
{
id   : 'StaffProduct',
    title: 'Staff Products',
},
{
id   : 'events',
title: 'Events',
},
{
id   : 'extra-mural-activities',
title: 'Extra Mural Activities',
},
{
id   : 'grades',
title: 'Grades',
},
{
id   : 'fees',
    title: 'Fees',
},
{
id   : 'myclasses',
title: 'My Classes',
},
{
id   : 'pupil',
title: 'Pupil',
}
]
