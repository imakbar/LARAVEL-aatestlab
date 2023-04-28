<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

// use Faker\Factory as Faker;
use Faker\Generator as Faker;
use App\Models\Patient;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class PatientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(Faker $faker)
    {
        Patient::truncate();
        for($count=1;$count<10000+1;$count++)
        {
            DB::table('patients')->insert([
                'name' => $faker->name,
                'mobile' => $faker->phoneNumber,
                'address' => $faker->address,
    
                'status' => 'active',
    
                'created_by' => 1,
                'created_date' => now(),
                'created_time' => now(),
                'updated_by' => 1,
                'updated_date' => now(),
                'updated_time' => now(),
            ]);
        }
    }
}
