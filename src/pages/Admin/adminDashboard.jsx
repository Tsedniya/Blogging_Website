import api from '../../common/api/connect';
import React, { useState, useEffect } from 'react';
import BlogReport from '../../features/blog/BlogReport';

const blogs = [
  {
    id: 1,
    title: 'sdf',
    image: 'image url',
    desc: '',
    catagory: 'Tech',
    body: '',
    author: {
      id: 1,
      full_name: 'Alex /greek',
    },
    likes: 0,

    created_at: '2023-10-01T00:00:00Z',
  },
];

function AdminDashboard() {
  return (
    <section class="py-4 ">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 class="font-manrope text-4xl font-bold text-gray-900 text-center mb-16">
          Reports
        </h2>
        <BlogReport />
      </div>
    </section>
  );
}

export default AdminDashboard;
