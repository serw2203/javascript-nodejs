const util = require('util');
const TreeWalker = require('javascript-parser').TreeWalker;
const TaskNode = require('javascript-parser').TaskNode;
const CompositeTag = require('javascript-parser').CompositeTag;
const TextNode = require('javascript-parser').TextNode;
const ErrorTag = require('javascript-parser').ErrorTag;
const mongoose = require('lib/mongoose');
const Reference = mongoose.models.Reference;
const Article = mongoose.models.Article;
const Task = mongoose.models.Task;

function TaskResolver(root) {
  this.root = root;
}

TaskResolver.prototype.run = function* () {

  var treeWalker = new TreeWalker(this.root);

  var self = this;
  yield treeWalker.walk(function*(node) {
    if (!(node instanceof TaskNode)) return;



    return new TextNode("<div>[task " + node.slug + "]</div>");

  });
};

exports.TaskResolver = TaskResolver;