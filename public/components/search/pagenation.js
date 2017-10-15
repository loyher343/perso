//***************************** test-model ******************************************** */


angular.module('comicApp').controller('UsersController', function($scope, $http) {
    $scope.users = [];
    $scope.totalUsers = 0;
    $scope.usersPerPage = 25; // this should match however many results your API puts on one page
    getResultsPage(1);

    $scope.pagination = {
        current: 1
    };

    $scope.pageChanged = function(newPage) {
        getResultsPage(newPage);
    };

    function getResultsPage(pageNumber) {
        // this is just an example, in reality this stuff should be in a service
        $http.get('path/to/api/users?page=' + pageNumber)
            .then(function(result) {
                $scope.users = result.data.Items;
                $scope.totalUsers = result.data.Count
            });
    }
})



{/* <div ng-controller="UsersController">
<table>
<tr dir-paginate="user in users | itemsPerPage: usersPerPage" total-items="totalUsers" current-page="pagination.current">
    <td>{{ user.name }}</td>
    <td>{{ user.email }}</td>
</tr>
</table>

<dir-pagination-controls on-page-change="pageChanged(newPageNumber)"></dir-pagination-controls>
</div> */}