app.directive('reviewItem', function() {
  return {
    restrict: 'E',
    scope: {
      review: "=review",
    },
    templateUrl: 'js/common/directives/review-item/review-item.html'
  };
});