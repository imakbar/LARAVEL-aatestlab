<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::truncate();
        User::factory()->count(5)->create();
        // for($count=1;$count<10+1;$count++)
        // {
        //     DB::table('users')->insert([
        //         'name' => 'Bed '.$count,
        //         'email' => Str::slug('Bed '.$count,"_"),
    
        //         'meta_tags' => 'Bed '.$count,
        //         'meta_description' => 'Bed '.$count,
    
        //         'status' => 'active',
    
        //         'created_by' => 1,
        //         'created_date' => now(),
        //         'created_time' => now(),
        //         'updated_by' => 1,
        //         'updated_date' => now(),
        //         'updated_time' => now(),
        //     ]);
        // }
    }
}
