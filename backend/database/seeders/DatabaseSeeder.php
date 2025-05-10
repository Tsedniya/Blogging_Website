<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seed roles
        DB::table('roles')->insert([
            ['name' => 'admin'],
            ['name' => 'user'],
        ]);

        // Seed categories
        DB::table('categories')->insert([
            ['name' => 'Technology'],
            ['name' => 'Education'],
            ['name' => 'Programming'],
            ['name' => 'Health'],
            ['name' => 'Fitness'],
        ]);

        // Seed profiles
        DB::table('profiles')->insert([
            ['name' => 'John Doe', 'email' => 'john@example.com', 'profile_image' => null],
            ['name' => 'Jane Smith', 'email' => 'jane@example.com', 'profile_image' => null],
            ['name' => 'Alice Johnson', 'email' => 'alice@example.com', 'profile_image' => null],
        ]);

        // Seed users
        DB::table('users')->insert([
            ['profile_id' => 1, 'role_id' => 1, 'password' => Hash::make('password')],
            ['profile_id' => 2, 'role_id' => 2, 'password' => Hash::make('password')],
            ['profile_id' => 3, 'role_id' => 2, 'password' => Hash::make('password')],
        ]);

        // Seed blogs
        DB::table('blogs')->insert([
            ['title' => 'Tech Trends 2025', 'content' => 'Content about tech trends.', 'image' => null, 'user_id' => 1, 'category_id' => 1, 'status' => 'active'],
            ['title' => 'Education in the Future', 'content' => 'Content about education.', 'image' => null, 'user_id' => 2, 'category_id' => 2, 'status' => 'active'],
            ['title' => 'Programming Tips', 'content' => 'Content about programming.', 'image' => null, 'user_id' => 3, 'category_id' => 3, 'status' => 'active'],
        ]);

        // Seed comments
        DB::table('comments')->insert([
            ['content' => 'Great blog!', 'user_id' => 2, 'blog_id' => 1],
            ['content' => 'Very informative.', 'user_id' => 3, 'blog_id' => 2],
            ['content' => 'Thanks for sharing.', 'user_id' => 1, 'blog_id' => 3],
        ]);

        // Seed likes
        DB::table('likes')->insert([
            ['user_id' => 1, 'blog_id' => 2],
            ['user_id' => 2, 'blog_id' => 3],
            ['user_id' => 3, 'blog_id' => 1],
        ]);

        // Seed reports
        DB::table('reports')->insert([
            ['user_id' => 2, 'blog_id' => 1, 'reason' => 'Inappropriate content'],
            ['user_id' => 3, 'blog_id' => 2, 'reason' => 'Spam'],
        ]);

        // Seed follows
        DB::table('follows')->insert([
            ['follower_id' => 1, 'followed_id' => 2],
            ['follower_id' => 2, 'followed_id' => 3],
            ['follower_id' => 3, 'followed_id' => 1],
        ]);
        DB::table('blog_descriptions')->insert([
            ['blog_id' => 1, 'description' => 'Detailed description for blog 1.'],
            ['blog_id' => 2, 'description' => 'Detailed description for blog 2.'],
            ['blog_id' => 3, 'description' => 'Detailed description for blog 3.'],
        ]);
    }
}