<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(RolesAndUsersSeeder::class);
        // User::factory(10)->create();

        User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => 'password',
                'email_verified_at' => now(),
            ]
        );
        
        $this->call([ FormsSeeder::class,]);
        $this->call([ AnswersTypesSeeder::class,]);
        $this->call([ QuestionSeeder::class,]);
        $this->call([ AnswersOptionsSeeder::class,]);
        $this->call([ TutorSeeder::class,]);
        $this->call([ PupilSeeder::class,]);
        $this->call([ ReunionSeeder::class,]);
    }
}
