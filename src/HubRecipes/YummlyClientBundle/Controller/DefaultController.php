<?php

namespace HubRecipes\YummlyClientBundle\Controller;

use HubRecipes\YummlyClientBundle\Services\SearchService;
//use HubRecipes\YummlyClientBundle\Services\GetRecipeService;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use HubRecipes\FrontEndBundle\Entity\Ingredients;

class DefaultController extends Controller
{
    public function indexAction($name)
    {
        /** @var SearchService $search */
      //  $search = $this->get('hub_recipes_yummly_client.search_service');

      //  $results = $search->search(['sss' => 'sdfsf']);
        $getRecipe = $this->get('hub_recipes_yummly_client.getrecipe_service');
        $recipe = $getRecipe->getRecipe($name);
        return $this->render('HubRecipesYummlyClientBundle:Default:index.html.twig', array('response' => $recipe));
    }

    public function searchResultsAction(Request $request){
        $withIngredientsI = [];
        $withoutIngredientsI = [];
        $withIngredients = $request->query->get('likeIngredients');
        $withoutIngredients = $request->query->get('unlikeIngredients');

        for($i=0; $i < count($withIngredients) - 1; $i++){
            $withIngredientsI[$i] = str_replace(' ', '%20', $withIngredients[$i]);
        }

        for($i=0; $i < count($withoutIngredients) - 1; $i++){
            $withoutIngredientsI[$i] = str_replace(' ', '%20', $withoutIngredients[$i]);
        }

        $sour = $request->query->get('Sour');
       // print $sour; exit;

        if (strpos($sour, ',') !== false) {
            $sour = strstr($sour, ',', true);
        }

        $salty = $request->query->get('Salty');

        if (strpos($salty, ',') !== false) {
            $salty = strstr($salty, ',', true);
        }

        $sweet = $request->query->get('Sweet');

        if (strpos($sweet, ',') !== false) {
            $sweet = strstr($sweet, ',', true);
        }

        $spicy = $request->query->get('Spicy');

        if (strpos($spicy, ',') !== false) {
            $spicy = strstr($spicy, ',', true);
        }

        $bitter = $request->query->get('Bitter');

        if (strpos($bitter, ',') !== false) {
            $bitter = strstr($bitter, ',', true);
        }

        $savory = $request->query->get('Savory');

        if (strpos($savory, ',') !== false) {
            $savory = strstr($savory, ',', true);
        }

        $time = $request->query->get('Time')*60;

        if (strpos($time, ',') !== false) {
            $time = strstr($time, ',', true);
        }

        $type = $request->query->get('Type');

        if (strpos($type, ',') !== false) {
            $type = strstr($type, ',', true);
        }

        $cuisine = $request->query->get('Cuisine');

        if (strpos($cuisine, ',') !== false) {
            $cuisine = strstr($cuisine, ',', true);
        }

        $start = 0;

        /** @var SearchService $search */
        $getResults = $this->get('hub_recipes_yummly_client.search_service');
        $results = $getResults->getResults($sour,$salty, $sweet, $spicy, $bitter, $savory, $time, $type, $withIngredientsI, $withoutIngredientsI, $start, $cuisine);

        return $this->render('HubRecipesFrontEndBundle:Default:results.html.twig', array('results' => $results,
            'likeI' => $withIngredientsI, 'unlikeI' => $withoutIngredientsI, 'Sour' => $sour, 'Salty' => $salty, 'Sweet' => $sweet, 'Spicy' => $spicy, 'Bitter' => $bitter,
            'Savory' => $savory, 'Time' => $time, 'Type' => $type, 'Cuisine' => $cuisine
        ));
    }

    public function searchByCuisineAction($cuisine, $start){

        $getResults = $this->get('hub_recipes_yummly_client.search_service');
        $results = $getResults->getCuisineResults($cuisine, $start);

        return $this->render('HubRecipesFrontEndBundle:Default:results.html.twig', array('results' => $results,
            'likeI' => '', 'unlikeI' => '', 'Sour' => '', 'Salty' => '', 'Sweet' => '', 'Spicy' => '', 'Bitter' => '',
            'Savory' => '', 'Time' => '', 'Type' => '-', 'Cuisine' => $cuisine
        ));
    }

    public function loadMoreCuisineAction() {
        if ($this->get('request')->isXmlHttpRequest()){
            $cuisine = $this->get('request')->request->get('cuisine');
            $sour = $this->get('request')->request->get('sour');
            $salty = $this->get('request')->request->get('salty');
            $sweet = $this->get('request')->request->get('sweet');
            $spicy = $this->get('request')->request->get('spicy');
            $bitter = $this->get('request')->request->get('bitter');
            $savory = $this->get('request')->request->get('savory');
            $time = $this->get('request')->request->get('timee');
            $type = $this->get('request')->request->get('typeS');
            $k = $this->get('request')->request->get('start');
            $like = $this->get('request')->request->get('like');
            if ($like == ""){
                $like = [];
            }
            $unlike = $this->get('request')->request->get('unlike');
            if ($unlike == ""){
                $unlike = [];
            }
            $getResults = $this->get('hub_recipes_yummly_client.search_service');
            $results = $getResults->getResults($sour,$salty, $sweet, $spicy, $bitter, $savory, $time, $type, $like, $unlike, $k, $cuisine);
            return new JsonResponse(array('res'=>$results));
        }
    }

    public function fillIngredientsAction(){
        $getResults = $this->get('hub_recipes_yummly_client.search_service');
        $results = $getResults->fillIngredients();
        $em = $this->getDoctrine()->getManager();
        $yra = false;
        $new = 0;
        for($i = 0; $i < count($results); $i++){
            $yra = false;
            $query = $em->createQuery(
                'SELECT i.ingredient
                 FROM HubRecipes\\FrontEndBundle\\Entity\\Ingredients i
                  ');
            $products = $query->getArrayResult();
            for($j = 0; $j < count($results['matches'][$i]['ingredients']); $j++){
                for($jj = 0; $jj < count($products); $jj++){
                    if($products[$jj]['ingredient'] == $results['matches'][$i]['ingredients'][$j]){
                        $yra = true;
                    }
                }
                if(!$yra){
                    $ing = new Ingredients();
                    $ing->setIngredient($results['matches'][$i]['ingredients'][$j]);
                    $em = $this->getDoctrine()->getManager();
                    $em->persist($ing);
                    $em->flush();
                    $new++;
                }
               $yra = false;
            }
        }
        print $new;
    }
}
