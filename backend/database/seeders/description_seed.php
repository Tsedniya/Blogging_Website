<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class description_seed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       
        DB::table('blog_descriptions')->insert([
            ['blog_id' => 1, 'description' => 'Detailed description for blog 1.'],
            ['blog_id' => 2, 'description' => 'Detailed description for blog 2.'],
            ['blog_id' => 3, 'description' => 'Detailed description for blog 3.'],
        ]);
    }
}
