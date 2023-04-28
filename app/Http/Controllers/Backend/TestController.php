<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;

use App\Models\MainTest;
use App\Models\SubTest;
use App\Models\SubTestDetail;
use Illuminate\Pagination\LengthAwarePaginator;

class TestController extends Controller
{
    public function getTests(Request $request){
        $MainTest = new MainTest();
        
        $perPageAction = $request->perPageAction;

        // $subTests = DB::table('main_tests')->leftJoin('sub_tests','sub_tests.maintest_id','=','main_tests.id')
        //     ->select(
        //         'main_tests.id as maintest_id',
        //         'main_tests.test_code as main_test_code',
        //         'main_tests.test_name as main_test_name',
        //         'main_tests.order_by as main_order_by',
        //         'main_tests.status',

        //         'sub_tests.id as subtest_id',
        //         'sub_tests.test_code as sub_test_code',
        //         'sub_tests.test_name as sub_test_name',
        //         'sub_tests.test_rate as sub_test_rate',
        //         'sub_tests.order_by as sub_order_by',
        //         'sub_tests.status',
        //     )
        //     ->where('main_tests.status','active')
        //     ->where('sub_tests.status','active')
        //     ->orderBy('main_tests.order_by','ASC')
        //     ->paginate($perPageAction);

        $query = '';

        $main_test_code = '';
        if(isset($request->search['main_test_code'])){
            $main_test_code = $request->search['main_test_code'];
            $query .= "AND m.test_code LIKE '%$main_test_code%'";
        }
        $main_test_name = '';
        if(isset($request->search['main_test_name'])){
            $main_test_name = $request->search['main_test_name'];
            $query .= "AND m.test_name LIKE '%$main_test_name%'";
        }
        $sub_test_code = '';
        if(isset($request->search['sub_test_code'])){
            $sub_test_code = $request->search['sub_test_code'];
            $query .= "AND s.test_code LIKE '%$sub_test_code%'";
        }
        $sub_test_name = '';
        if(isset($request->search['sub_test_name'])){
            $sub_test_name = $request->search['sub_test_name'];
            $query .= "AND s.test_name LIKE '%$sub_test_name%'";
        }

        // $subTests = DB::select(
        //     "SELECT 
        //         m.id as maintest_id, 
        //         m.test_code as main_test_code, 
        //         m.test_name as main_test_name, 
        //         m.test_rate as main_test_rate, 
        //         m.order_by as main_test_order_by, 
        //         s.id as subtest_id, 
        //         s.test_code as sub_test_code, 
        //         s.test_name as sub_test_name, 
        //         s.test_rate as sub_test_rate
        //     FROM main_tests as m 
        //     LEFT JOIN sub_tests as s ON m.id = s.maintest_id 
        //     WHERE m.status = 'active'
        //     AND m.test_code LIKE :main_test_code 
        //     AND m.test_name LIKE :main_test_name
        //     AND s.test_code LIKE :sub_test_code
        //     AND s.test_name LIKE :sub_test_name", [
        //         'main_test_code' => "%$main_test_code%",
        //         'main_test_name' => "%$main_test_name%",
        //         'sub_test_code' => "%$sub_test_code%",
        //         'sub_test_name' => "%$sub_test_name%"
        //     ]);

        // $subTests = new LengthAwarePaginator($subTests, count($subTests), $perPageAction);

        $subTests = DB::select(
            "SELECT 
                m.id as maintest_id, 
                m.test_code as main_test_code, 
                m.test_name as main_test_name, 
                -- m.test_rate as main_test_rate, 
                m.order_by as main_test_order_by, 
                s.id as subtest_id, 
                s.test_code as sub_test_code, 
                s.test_name as sub_test_name, 
                s.test_rate as sub_test_rate, 
                s.reporting_time as reporting_time
            FROM main_tests as m 
            LEFT JOIN sub_tests as s ON m.id = s.maintest_id 
            WHERE m.status = 'active' ".$query);

        // return $subTests;

        // $subTests = DB::table('main_tests')->leftJoin('sub_tests', function($join){
        //     $join->on('main_tests.id', '=', 'sub_tests.maintest_id');
        // })
        //     ->select(
        //         'main_tests.id as maintest_id',
        //         'main_tests.test_code as main_test_code',
        //         'main_tests.test_name as main_test_name',
        //         'main_tests.order_by as main_order_by',

        //         'sub_tests.id as subtest_id',
        //         'sub_tests.test_code as sub_test_code',
        //         'sub_tests.test_name as sub_test_name',
        //         'sub_tests.test_rate as sub_test_rate',
        //         'sub_tests.order_by as sub_order_by'
        //     )
        //     // ->where('main_tests.status','active')
        //     // ->where('sub_tests.status','active')
        //     // ->orderBy('sub_tests.order_by','ASC')
        //     ->paginate($perPageAction);

        // return $subTests;
        // $tests = [];

        // foreach ($MainTest->getAllByStatus('active')->orderBy('order_by','ASC')->get() as $mtKey => $mt) {
        //     $data = $mt;
        //     $subArray = [];
        //     foreach ($subTests as $stKey => $st) {
        //         if($st->maintest_id == $mt->id){
        //             $subArray[] = $st;
        //         }
        //     }
        //     $data['sub_tests'] = $subArray;
        //     $tests[] = $data;
        // }

        // return $tests;
        
        return [
            // 'tests' => $tests,
            // 'main_tests' => $MainTest->getAllByStatus('active')->get(),
            'tests' => $subTests,
            'perPageOptions' => perPageOptions(),
        ];
    }

    // public function getSelectedTests(Request $request){
    //     $tests = [];
    //     $testIds = [];
    //     foreach ($request->tests as $key => $item) {
    //         if($item['type'] == 'main_test'){
    //             $SubTest = new SubTest();
    //             $SubTests = $SubTest->getAllByMainTestId($item['test_id']);
    //             if(sizeof($SubTests) > 0){
    //                 foreach ($SubTests as $key => $S) {
    //                     $M = new MainTest();
    //                     $S['main_test'] = $M->getById($S->maintest_id);
    //                     $tests[] = $S;
    //                     $testIds[] = $S['id'];
    //                 }
    //             }
    //         }
    //         if($item['type'] == 'sub_test'){
    //             $SubTest = new SubTest();
    //             if($SubTest->checkById($item['test_id']) > 0){
    //                 $M = new MainTest();
    //                 $S = $SubTest->getById($item['test_id']);
    //                 $S['main_test'] = $M->getById($S->maintest_id);
    //                 $tests[] = $S;
    //                 $testIds[] = $SubTest->getById($item['test_id'])['id'];
    //             }
    //         }
    //     }
    //     $SubTest = new SubTest();
    //     return [
    //         'tests' => $tests,
    //         'total' => $SubTest->whereIn('id',$testIds)->sum('test_rate'),
    //     ];
    // }
}
